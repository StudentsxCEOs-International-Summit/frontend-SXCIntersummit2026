import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import AuthCard, { Alert, SubmitButton } from '@/components/auth/AuthCard'
import PasswordField from '@/components/auth/PasswordField'
import { PasswordChecklist } from '@/components/ui'
import { usePageTitle } from '@/hooks/usePageTitle'
import { ApiError } from '@/lib/api'
import { authService } from '@/services/auth'
import { PASSWORD_REQUIREMENTS, isPasswordValid } from '@/utils/validation/registerValidation'

export default function ResetPasswordPage() {
  usePageTitle('Reset Password')
  const navigate = useNavigate()
  const location = useLocation()
  const resetToken = (location.state as { resetToken?: string } | null)?.resetToken

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({})
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // The token only exists right after the OTP step; without it there is nothing to reset.
  if (!resetToken) return <Navigate to="/forgot-password" replace />

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    const next: typeof errors = {}
    if (!isPasswordValid(password)) next.password = 'Password must meet all requirements below.'
    if (password !== confirm) next.confirm = 'Passwords do not match.'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    try {
      setSubmitting(true)
      await authService.resetPassword({ password, resetToken })
      navigate('/login', {
        replace: true,
        state: { notice: 'Password updated. Please log in with your new password.' },
      })
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

  return (
    <AuthCard title="Set a New Password" subtitle="Choose a strong password you haven't used before.">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {error && <Alert kind="error">{error}</Alert>}
        <div>
          <PasswordField
            id="password"
            label="New Password"
            value={password}
            onChange={(v) => {
              setPassword(v)
              setErrors((p) => ({ ...p, password: undefined }))
            }}
            error={errors.password}
            placeholder="Create a password"
          />
          <PasswordChecklist password={password} requirements={PASSWORD_REQUIREMENTS} />
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
        <SubmitButton loading={submitting}>Update Password</SubmitButton>
      </form>
    </AuthCard>
  )
}
