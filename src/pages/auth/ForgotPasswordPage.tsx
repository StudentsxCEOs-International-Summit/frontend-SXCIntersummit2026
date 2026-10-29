import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail } from 'lucide-react'
import AuthCard, { Alert, SubmitButton } from '@/components/auth/AuthCard'
import { FormField } from '@/components/ui'
import { usePageTitle } from '@/hooks/usePageTitle'
import { ApiError } from '@/lib/api'
import { authService } from '@/services/auth'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ForgotPasswordPage() {
  usePageTitle('Forgot Password')
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [fieldError, setFieldError] = useState<string | undefined>()
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    const value = email.replace(/\s+/g, '')
    if (!EMAIL_RE.test(value)) {
      setFieldError('Enter a valid email address.')
      return
    }
    setFieldError(undefined)

    try {
      setSubmitting(true)
      await authService.forgotPassword(value)
      navigate('/verify-otp', { state: { email: value, purpose: 'reset' } })
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthCard
      title="Forgot Password?"
      subtitle="Enter your email and we'll send you a code to reset it."
      footer={
        <Link to="/login" className="text-brand-blue-500 font-bold hover:underline">
          Back to login
        </Link>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {error && <Alert kind="error">{error}</Alert>}
        <FormField
          id="email"
          label="Email Address"
          icon={<Mail className="h-4 w-4" />}
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setFieldError(undefined)
          }}
          error={fieldError}
        />
        <SubmitButton loading={submitting}>Send Code</SubmitButton>
      </form>
    </AuthCard>
  )
}
