import { api } from '@/lib/api'
import type { AppConfig } from '@/services/config'

/** Shapes returned by GET /ibcc/admin/teams (back-end/src/features/ibcc/ibcc.service.ts). */
export interface AdminPerson {
  id: number
  name: string
  email: string
  wa_number: string | null
  institution_name: string | null
  major: string | null
}

export interface AdminFile {
  id: number
  fileType: string | null
  /** A Drive link, or `pending:<name>` while the file still waits for its Drive upload. */
  filePath: string
  fileSize: number | null
  gdriveId: string | null
  uploadedAt: string
}

export interface AdminSubmission {
  id: number
  stage: 'REGISTRATION' | 'PREELIM' | 'SEMINAR' | 'FINAL' | 'SEMIFINAL'
  event: string
  type: 'IDCARD' | 'PAYMENT' | 'TASK' | 'PROMOTION' | 'CV'
  submittedAt: string
  Files: AdminFile[]
}

export interface AdminTeam {
  id: number
  name: string
  code: string
  createdAt: string
  status: number
  score: number | null
  memberComposition: string | null
  sourceInfo: string | null
  leader: AdminPerson
  TeamMember: {
    role: 'LEADER' | 'MEMBER'
    institution: string | null
    major?: string | null
    yearOfStudy: string | null
    user: AdminPerson
  }[]
  statuscode: { id: number; code: string; description: string }
  submissionTeam: AdminSubmission[]
}

export interface ScoreRanking {
  teamId: number
  teamName: string
  average: number
  scores: { judgeId: number; judgeName: string; score: number; comment: string | null }[]
}

export interface ConfigUpdate {
  registrationDeadline?: string
  registrationExtendedDeadline?: string
  extendedRegistrationEnabled?: boolean
  maxSlidePages?: number
  maxSlideSizeMB?: number
  deadlineReminderDays?: number
  paymentReminderDays?: number
}

/** One function per existing staff route (ibcc, finance, access-code and config routers). */
export const adminService = {
  /** GET /ibcc/admin/teams */
  teams: () => api.get<AdminTeam[]>('/ibcc/admin/teams'),

  /** POST /finance/verify. Approving also emails the leader an access code. */
  verifyPayment: (input: { teamId: number; status: 'approved' | 'rejected'; notes?: string }) =>
    api.post<unknown>('/finance/verify', input),

  /** PUT /ibcc/admin/preliminary/:teamId */
  evaluatePreliminary: (
    teamId: number,
    input: { status: 'passed' | 'failed'; feedback?: string; score?: number },
  ) => api.put<unknown>(`/ibcc/admin/preliminary/${teamId}`, input),

  /** POST /access-code/generate */
  generateAccessCode: (teamId: number) =>
    api.post<{ teamId: number; teamName: string; accessCode: string; expiresAt: string }>(
      '/access-code/generate',
      { teamId },
    ),

  /** GET /ibcc/semifinal/scores */
  scores: () => api.get<{ rankings: ScoreRanking[] }>('/ibcc/semifinal/scores'),

  /** POST /ibcc/semifinal/score (the signed-in staff member is the judge). */
  submitScore: (input: { teamId: number; score: number; comment?: string }) =>
    api.post<unknown>('/ibcc/semifinal/score', input),

  /** POST /ibcc/semifinal/publish-results. Emails every scored team. */
  publishResults: (qualifiedTeamIds: number[]) =>
    api.post<{ qualified: number[]; eliminated: number[] }>('/ibcc/semifinal/publish-results', {
      qualifiedTeamIds,
    }),

  /** PATCH /config. Lives in server memory: it is lost on restart unless the env is updated too. */
  updateConfig: (input: ConfigUpdate) => api.patch<AppConfig>('/config', input),

  /** POST /config/reload (re-reads the server environment). */
  reloadConfig: () => api.post<unknown>('/config/reload'),

  /** POST /config/trigger-emails (runs the deadline/payment reminder job now). */
  triggerEmails: () => api.post<unknown>('/config/trigger-emails'),
}

const EVENT_LABELS: Record<string, string> = {
  IBCC_REQUIREMENT_KTM: 'Student ID (KTM)',
  IBCC_REQUIREMENT_FOLLOW: 'Instagram follow proof',
  IBCC_REQUIREMENT_TWIBBON: 'Twibbon proof',
  IBCC_REQUIREMENT_POSTER: 'Poster share proof',
  IBCC_REQUIREMENT_BROADCAST: 'Broadcast share proof',
  IBCC_PRELIMINARY_OUTPUT: 'Preliminary slide deck',
}

export function submissionLabel(submission: AdminSubmission) {
  if (submission.type === 'PAYMENT') return 'Payment proof'
  if (submission.stage === 'SEMIFINAL') return 'Semifinal slide deck'
  // Older rows were written with other casing/separators (e.g. IBCC-requirement-twibbon).
  return EVENT_LABELS[submission.event.toUpperCase().replace(/-/g, '_')] ?? submission.event
}

export const isPendingFile = (file: AdminFile) =>
  !file.gdriveId && file.filePath.startsWith('pending:')

export const fileLink = (file: AdminFile) =>
  /^https?:\/\//.test(file.filePath) ? file.filePath : null

export const humanize = (value: string) =>
  value
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

export const paymentOf = (team: AdminTeam) =>
  team.submissionTeam.filter((s) => s.type === 'PAYMENT').at(-1)
export const preliminaryOf = (team: AdminTeam) =>
  team.submissionTeam.find((s) => s.stage === 'PREELIM' && s.type === 'TASK')
export const semifinalOf = (team: AdminTeam) =>
  team.submissionTeam.find((s) => s.stage === 'SEMIFINAL')
