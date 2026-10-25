import { useEffect, useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { KeyRound } from 'lucide-react'
import AuthCard, { Alert, SubmitButton } from '@/components/auth/AuthCard'
import { FormField } from '@/components/ui'
import { useAuth } from '@/context/AuthContext'
import { usePageTitle } from '@/hooks/usePageTitle'
import { ApiError } from '@/lib/api'
import { authService } from '@/services/auth'

const RESEND_COOLDOWN_SECONDS = 30

interface OtpRouteState {
  email?: string
  purpose?: 'register' | 'reset'
  next?: string
}

/**
 * Step 2 of both sign-up and "forgot password": the user types the 6-digit code from the email.
 * POST /auth/verify-otp answers differently per purpose (a session for sign-up, a reset token
 * for password reset), so we branch on what comes back.
 */
export default function VerifyOtpPage() {
  usePageTitle('Verify Email')
  const navigate = useNavigate()
  const location = useLocation()
  const { setUser } = useAuth()
  const state = location.state as OtpRouteState | null
  const email = state?.email
  const purpose = state?.purpose ?? 'register'

  const [otp, setOtp] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS)

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = window.setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [cooldown])

  if (!email) {
    return <Navigate to={purpose === 'reset' ? '/forgot-password' : '/register'} replace />
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setInfo(null)

    if (!/^\d{6}$/.test(otp)) {
      setError('Enter the 6-digit code from your email.')
      return
    }

    try {
      setSubmitting(true)
      const data = await authService.verifyOtp({ email, otp })

      if (data.resetToken) {
        navigate('/reset-password', { replace: true, state: { resetToken: data.resetToken } })
      } else if (data.user) {
        setUser(data.user)
        // A fresh sign-up came here to register a team, so continue to that form.
        navigate(state?.next ?? '/team-register', { replace: true })
      } else {
        setError('Verification finished, but the server did not start a session. Please log in.')
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleResend = async () => {
    setError(null)
    setInfo(null)
    try {
      await authService.resendOtp(email)
      setInfo('A new code has been sent to your email.')
      setCooldown(RESEND_COOLDOWN_SECONDS)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not resend the code.')
    }
  }

  return (
    <AuthCard
      title={purpose === 'reset' ? 'Check Your Email' : 'Verify Your Email'}
      subtitle={
        <>
          We sent a 6-digit code to <strong className="text-brand-blue-900">{email}</strong>
        </>
      }
      footer={
        <Link to="/login" className="text-brand-blue-500 font-bold hover:underline">
          Back to login
        </Link>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {error && <Alert kind="error">{error}</Alert>}
        {info && <Alert kind="success">{info}</Alert>}

        <FormField
          id="otp"
          label="Verification Code"
          icon={<KeyRound className="h-4 w-4" />}
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          placeholder="123456"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
        />

        <SubmitButton loading={submitting}>Verify</SubmitButton>

        <p className="text-center text-sm text-slate-500">
          Didn&apos;t get it?{' '}
          <button
            type="button"
            onClick={handleResend}
            disabled={cooldown > 0}
            className="text-brand-blue-500 cursor-pointer font-bold hover:underline disabled:cursor-not-allowed disabled:text-slate-400 disabled:no-underline"
          >
            {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend code'}
          </button>
        </p>
      </form>
    </AuthCard>
  )
}
