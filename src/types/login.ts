export interface LoginFormState {
  email: string
  password: string
  rememberMe: boolean
}

export type LoginFieldErrors = Partial<Record<keyof LoginFormState, string>>
