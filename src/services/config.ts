import { api } from '@/lib/api'

/** GET /config (public) in back-end/src/features/config/config.route.ts. */
export interface AppConfig {
  registrationOpen: boolean
  /** ISO timestamp of the effective registration deadline. */
  deadline: string
  extendedRegistration: boolean
  maxSlidePages: number
  maxSlideSizeMB: number
  deadlineReminderDays?: number
  paymentReminderDays?: number
}

export const configService = {
  get: () => api.get<AppConfig>('/config'),
}
