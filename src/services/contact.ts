import { api } from '@/lib/api'

/** back-end/src/features/contact/contact.schema.ts */
export const CONTACT_TYPES = [
  'Sponsorship',
  'Media Partner',
  'Community Partner',
  'Case Collaborator',
  'Other',
] as const

export type ContactType = (typeof CONTACT_TYPES)[number]
export type ContactStatus = 'NEW' | 'READ' | 'ARCHIVED'

export interface ContactInput {
  name: string
  organization: string
  email: string
  type: ContactType
  message: string
  /** Honeypot: stays empty for real visitors. */
  website?: string
}

export interface ContactMessage {
  id: number
  name: string
  organization: string
  email: string
  type: string
  message: string
  status: ContactStatus
  createdAt: string
}

export interface ContactList {
  items: ContactMessage[]
  total: number
  page: number
  pageSize: number
  counts: Partial<Record<ContactStatus, number>>
}

export const contactService = {
  /** POST /contact (public, 10 per hour per IP). */
  send: (input: ContactInput) => api.post<null>('/contact', input),

  /** GET /contact (staff). */
  list: (params: { status?: ContactStatus; page?: number; pageSize?: number } = {}) => {
    const query = new URLSearchParams()
    if (params.status) query.set('status', params.status)
    if (params.page) query.set('page', String(params.page))
    if (params.pageSize) query.set('pageSize', String(params.pageSize))
    const qs = query.toString()
    return api.get<ContactList>(`/contact${qs ? `?${qs}` : ''}`)
  },

  /** PATCH /contact/:id (staff). */
  setStatus: (id: number, status: ContactStatus) =>
    api.patch<ContactMessage>(`/contact/${id}`, { status }),
}
