import { api } from '@/lib/api'

export interface RegisteredTeam {
  teamId: number
  teamName: string
  teamCode: string
  driveFolderId: string
  driveFolderUrl: string
  status: string
  memberCount: number
  waGroupLink?: string | null
}

export interface TeamMemberInfo {
  id: number
  name: string
  email: string
  institution: string | null
  yearOfStudy: string | null
}

export interface MyTeam {
  id: number
  name: string
  code: string
  status: string
  isLeader: boolean
  competitionStage: 'REGISTRATION' | 'PREELIM' | 'SEMIFINAL'
  payment: {
    status: 'NOT_SUBMITTED' | 'PENDING_VERIFICATION' | 'PAID' | 'REJECTED'
    isUploaded: boolean
    fileUrl: string | null
    submittedAt: string | null
  }
  selectionResult: {
    isAnnounced: boolean
    isQualified: boolean
    announcementMessage: string | null
  }
  leader: { id: number; name: string; email: string; institution: string | null }
  members: TeamMemberInfo[]
  submissions: {
    requirementsCompleted: boolean
    paymentSubmitted: boolean
    paymentSubmittedAt: string | null
    preliminaryOutputSubmitted: boolean
    preliminarySubmittedAt: string | null
  }
}

/** One function per existing route in back-end/src/features/ibcc/ibcc.route.ts. */
export const ibccService = {
  /** POST /ibcc/register (multipart). Needs a session; the leader comes from the cookie. */
  registerTeam: (form: FormData) => api.post<RegisteredTeam>('/ibcc/register', form),

  /** GET /ibcc/my-team -> 404 ("No registered team found") when the user has no team yet. */
  getMyTeam: () => api.get<MyTeam>('/ibcc/my-team'),

  /** POST /ibcc/submission/preliminary (multipart, field `file`; PDF/PPT/PPTX/image, max 20 MB). */
  submitPreliminary: (file: File, teamId?: number) =>
    api.post<unknown>('/ibcc/submission/preliminary', uploadForm(file, teamId)),

  /** POST /ibcc/submission/semifinal (multipart, field `file`; PDF/PPT/PPTX/image, max 20 MB). */
  submitSemifinal: (file: File, teamId?: number) =>
    api.post<unknown>('/ibcc/submission/semifinal', uploadForm(file, teamId)),

  /** POST /ibcc/submission/payment (multipart, field `file`; images only, max 5 MB). */
  submitPayment: (file: File, teamId?: number) =>
    api.post<unknown>('/ibcc/submission/payment', uploadForm(file, teamId)),
}

/** All three submission endpoints take the same body: `file` plus an optional `teamId`. */
function uploadForm(file: File, teamId?: number) {
  const form = new FormData()
  form.append('file', file)
  if (teamId !== undefined) form.append('teamId', String(teamId))
  return form
}
