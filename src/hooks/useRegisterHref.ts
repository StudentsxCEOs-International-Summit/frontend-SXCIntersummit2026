import { useAuth } from '@/context/AuthContext'

/**
 * Where a "Register Now" button should lead: visitors without an account create one first,
 * people who are already signed in go straight to the team registration form.
 */
export function useRegisterHref() {
  const { user } = useAuth()
  return user ? '/team-register' : '/register'
}
