import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import AuthCard, { Alert, SubmitButton } from '@/components/auth/AuthCard'
import PasswordField from '@/components/auth/PasswordField'
import { PasswordChecklist } from '@/components/ui'
import { useAuth } from '@/context/AuthContext'
import { usePageTitle } from '@/hooks/usePageTitle'
import { ApiError } from '@/lib/api'
import { authService } from '@/services/auth'
import { ibccService, type MemberInvitation } from '@/services/ibcc'
import { PASSWORD_REQUIREMENTS } from '@/utils/validation/registerValidation'

// POST /ibcc/members/claim-account only asks for: 8+ chars, upper, lower, number (no symbol).
const CLAIM_REQUIREMENTS = PASSWORD_REQUIREMENTS.filter((rule) => rule.id !== 'symbol')
const isClaimPasswordValid = (password: string) => CLAIM_REQUIREMENTS.every((r) => r.test(password))

/**
 * Landing page for the invitation email: the backend links to `${CLIENT_URL}/claim-team?token=...`.
 * It checks the token (GET /ibcc/members/verify-token), lets the invited member choose a
 * password (POST /ibcc/members/claim-account) and then signs them in.
 */
export default function ClaimTeamPage() {
  usePageTitle('Join Your Team')
  const [params] = useSearchParams()
  const token = params.get('token')
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const [invitation, setInvitation] = useState<MemberInvitation | null>(null)
  const [loading, setLoading] = useState(Boolean(token))
  const [loadError, setLoadError] = useState<string | null>(
    token ? null : 'This invitation link is missing its token.',
  )

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({})
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!token) return
    let cancelled = false
    ibccService
      .verifyMemberToken(token)
      .then((data) => {
        if (!cancelled) setInvitation(data)
      })
      .catch((err) => {
        if (!cancelled) {
          setLoadError(err instanceof ApiError ? err.message : 'Could not verify this invitation.')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [token])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!token || !invitation) return
    setError(null)

    const next: typeof errors = {}
    if (!isClaimPasswordValid(password)) next.password = 'Password must meet all requirements below.'
    if (password !== confirm) next.confirm = 'Passwords do not match.'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    try {
      setSubmitting(true)
      await ibccService.claimMemberAccount({ token, password })

      // claim-account returns a token in the body but sets no cookie, so sign in normally.
      try {
        const { user } = await authService.login({ email: invitation.memberEmail, password })
        setUser(user)
        navigate('/my-team', { replace: true })
      } catch {
        navigate('/login', {
          replace: true,
          state: { notice: 'Your account is ready. Please log in to continue.' },
        })
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message)
        if (err.fieldErrors.password) setErrors({ password: err.fieldErrors.password })
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <AuthCard title="Checking Your Invitation">
        <div className="flex justify-center py-6" role="status">
          <span className="h-10 w-10 animate-spin rounded-full border-4 border-[#0262F4]/20 border-t-[#0262F4]" />
          <span className="sr-only">Loading…</span>
        </div>
      </AuthCard>
    )
  }

  if (loadError || !invitation) {
    return (
      <AuthCard
        title="Invitation Unavailable"
        footer={
          <Link to="/" className="text-brand-blue-500 font-bold hover:underline">
            Back to home
          </Link>
        }
      >
        <Alert kind="error">{loadError ?? 'This invitation could not be found.'}</Alert>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Join Your Team"
      subtitle={
        <>
          <strong className="text-brand-blue-900">{invitation.leaderName}</strong> invited you to join{' '}
          <strong className="text-brand-blue-900">{invitation.teamName}</strong> for IBCC 2026.
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {error && <Alert kind="error">{error}</Alert>}

        <div className="rounded-lg border border-[#D8E7F4] bg-[#F7FAFD] px-4 py-3 text-sm">
          <p className="font-semibold text-brand-blue-900">{invitation.memberName}</p>
          <p className="text-slate-500">{invitation.memberEmail}</p>
        </div>

        <div>
          <PasswordField
            id="password"
            label="Create Password"
            value={password}
            onChange={(v) => {
              setPassword(v)
              setErrors((p) => ({ ...p, password: undefined }))
            }}
            error={errors.password}
            placeholder="Create a password"
          />
          <PasswordChecklist password={password} requirements={CLAIM_REQUIREMENTS} />
        </div>
        <PasswordField
          id="confirm"
          label="Confirm Password"
          value={confirm}
          onChange={(v) => {
            setConfirm(v)
            setErrors((p) => ({ ...p, confirm: undefined }))
          }}
          error={errors.confirm}
          placeholder="Repeat your password"
        />
        <SubmitButton loading={submitting}>Activate Account</SubmitButton>
      </form>
    </AuthCard>
  )
}
