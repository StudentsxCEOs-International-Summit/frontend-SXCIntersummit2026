export interface RegisterFormState {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

export type RegisterFieldErrors = Partial<Record<keyof RegisterFormState, string>>

export interface PasswordRequirement {
  id: string
  label: string
  test: (password: string) => boolean
}
