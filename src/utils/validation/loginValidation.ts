import type { LoginFieldErrors, LoginFormState } from '@/types/login'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateLoginForm(form: LoginFormState): LoginFieldErrors {
  const errors: LoginFieldErrors = {}

  if (!form.email.trim()) errors.email = 'Please enter your email address.'
  else if (!EMAIL_RE.test(form.email)) errors.email = 'Please enter a valid email address.'

  if (!form.password) errors.password = 'Please enter your password.'

  return errors
}
