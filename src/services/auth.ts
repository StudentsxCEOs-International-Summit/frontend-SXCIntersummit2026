import { api } from '@/lib/api'

/** The JWT payload the backend returns from /auth/me and after login. */
export interface AuthUser {
  id: number
  email: string
  name: string
  role?: string
  accountType?: 'user' | 'staff'
}

interface SessionResponse {
  user: AuthUser
  token?: string
}

/** One function per existing route in back-end/src/features/auth/auth.route.ts. */
export const authService = {
  /** POST /auth/register -> sends an OTP email; the account is not active until verified. */
  register: (input: { name: string; email: string; password: string }) =>
    api.post<{ email: string }>('/auth/register', input),

  /** POST /auth/verify-otp. For sign-up it opens a session; for password reset it returns a reset token. */
  verifyOtp: (input: { email: string; otp: string }) =>
    api.post<{ user?: AuthUser; token?: string; resetToken?: string }>('/auth/verify-otp', input),

  /** POST /auth/resend-otp */
  resendOtp: (email: string) => api.post<null>('/auth/resend-otp', { email }),

  /** POST /auth/login */
  login: (input: { email: string; password: string }) =>
    api.post<SessionResponse>('/auth/login', input),

  /** POST /auth/admin/login -> staff session (the JWT payload carries accountType 'staff'). */
  adminLogin: (input: { email: string; password: string }) =>
    api
      .post<{ staff: { id: number; name: string; email: string; role: string } }>(
        '/auth/admin/login',
        input,
      )
      .then(({ staff }): AuthUser => ({ ...staff, accountType: 'staff' })),

  /** POST /auth/logout (needs the session cookie) */
  logout: () => api.post<null>('/auth/logout'),

  /** GET /auth/me -> 401 when there is no valid session cookie. */
  me: () => api.get<{ user: AuthUser }>('/auth/me'),

  /** POST /auth/forgot-password -> sends a reset OTP email. */
  forgotPassword: (email: string) => api.post<null>('/auth/forgot-password', { email }),

  /**
   * POST /auth/reset-password. The controller reads the reset token from the
   * Authorization header (the body schema strips unknown keys, so it cannot ride in the body).
   */
  resetPassword: (input: { password: string; resetToken: string }) =>
    api.post<null>('/auth/reset-password', { password: input.password }, { bearer: input.resetToken }),
}
