import type { LoginFieldErrors, LoginFormState } from '@/types/login'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateLoginForm(form: LoginFormState): LoginFieldErrors {
  const errors: LoginFieldErrors = {}
  const email = form.email.replace(/\s+/g, '')

  if (!email) errors.email = 'Please enter your email address.'
  else if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.'

  if (!form.password) errors.password = 'Please enter your password.'

  return errors
}
