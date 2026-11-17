import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Mail } from 'lucide-react'
import AuthCard, { Alert, SubmitButton } from '@/components/auth/AuthCard'
import PasswordField from '@/components/auth/PasswordField'
import { FormField } from '@/components/ui'
import { usePageTitle } from '@/hooks/usePageTitle'
import { authService } from '@/services/auth'
import { ApiError } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'

export default function AdminLoginPage() {
  usePageTitle('Admin Login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const { user, loading, setUser } = useAuth()
  const navigate = useNavigate()
  const routeState = useLocation().state as { from?: string; notice?: string } | null

  if (!loading && user?.accountType === 'staff') {
    return <Navigate to={routeState?.from ?? '/admin'} replace />
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    if (!email.replace(/\s+/g, '') || !password) {
      setError('Enter your admin email and password.')
      return
    }

    try {
      setSubmitting(true)
      setUser(await authService.adminLogin({ email: email.replace(/\s+/g, ''), password }))
      navigate(routeState?.from ?? '/admin', { replace: true })
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthCard title="Admin Console" subtitle="Committee access only. Sign in with your staff account.">
      <form onSubmit={submit} noValidate className="space-y-4">
        {routeState?.notice && <Alert kind="success">{routeState.notice}</Alert>}
        {error && <Alert kind="error">{error}</Alert>}

        <FormField
          id="admin-email"
          label="Staff Email"
          icon={<Mail className="h-4 w-4" />}
          type="email"
          autoComplete="username"
          placeholder="name@sxcinternationalsummit.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordField
          id="admin-password"
          label="Password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
        />
        <SubmitButton loading={submitting}>SIGN IN</SubmitButton>
      </form>
    </AuthCard>
  )
}
