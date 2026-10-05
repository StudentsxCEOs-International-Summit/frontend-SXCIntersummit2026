import type { PasswordRequirement, RegisterFieldErrors, RegisterFormState } from '@/types/register'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const PASSWORD_REQUIREMENTS: PasswordRequirement[] = [
  {
    id: 'length',
    label: 'At least 8 characters',
    test: (pwd) => pwd.length >= 8,
  },
  {
    id: 'upper',
    label: 'Contains an uppercase letter (A-Z)',
    test: (pwd) => /[A-Z]/.test(pwd),
  },
  {
    id: 'lower',
    label: 'Contains a lowercase letter (a-z)',
    test: (pwd) => /[a-z]/.test(pwd),
  },
  {
    id: 'number',
    label: 'Contains a number (0-9)',
    test: (pwd) => /\d/.test(pwd),
  },
  {
    id: 'symbol',
    label: 'Contains a symbol (!@#$%^&* etc.)',
    test: (pwd) => /[!@#$%^&*(),.?":{}|<>_\-+=~`[\]/\\;']/.test(pwd),
  },
]

export const isPasswordValid = (password: string): boolean =>
  PASSWORD_REQUIREMENTS.every((rule) => rule.test(password))

export function validateRegisterForm(form: RegisterFormState): RegisterFieldErrors {
  const errors: RegisterFieldErrors = {}

  if (!form.fullName.trim()) {
    errors.fullName = 'Please enter your full name.'
  }

  if (!form.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!EMAIL_RE.test(form.email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!form.password) {
    errors.password = 'Please create a password.'
  } else if (!isPasswordValid(form.password)) {
    errors.password = 'Password must meet all requirements below.'
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.'
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.'
  }

  if (!form.agreeToTerms) {
    errors.agreeToTerms = 'Please agree to the Terms & Conditions to continue.'
  }

  return errors
}
