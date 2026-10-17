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
  selectionResult: {
    isAnnounced: boolean
    isQualified: boolean
    announcementMessage: string | null
  }
  leader: { id: number; name: string; email: string; institution: string | null }
  members: TeamMemberInfo[]
  submissions: {
    requirementsCompleted: boolean
    preliminaryOutputSubmitted: boolean
    preliminarySubmittedAt: string | null
  }
}

export interface MemberInvitation {
  teamId: number
  teamName: string
  leaderName: string
  memberName: string
  memberEmail: string
  isAlreadyRegisteredUser: boolean
}

/** One function per existing route in back-end/src/features/ibcc/ibcc.route.ts. */
export const ibccService = {
  /** POST /ibcc/register (multipart). Needs a session; the leader comes from the cookie. */
  registerTeam: (form: FormData) => api.post<RegisteredTeam>('/ibcc/register', form),

  /** GET /ibcc/my-team -> 404 ("No registered team found") when the user has no team yet. */
  getMyTeam: () => api.get<MyTeam>('/ibcc/my-team'),

  /** GET /ibcc/members/verify-token?token=... (public: used by the invitation email link). */
  verifyMemberToken: (token: string) =>
    api.get<MemberInvitation>(`/ibcc/members/verify-token?token=${encodeURIComponent(token)}`),

  /** POST /ibcc/members/claim-account sets the invited member's password. */
  claimMemberAccount: (input: { token: string; password: string }) =>
    api.post<{ accessToken: string; user: { id: number; name: string; email: string } }>(
      '/ibcc/members/claim-account',
      input,
    ),

  /** POST /ibcc/submission/preliminary (multipart, field name `slideDeck`). */
  submitPreliminary: (file: File, teamId?: number) => {
    const form = new FormData()
    form.append('slideDeck', file)
    if (teamId !== undefined) form.append('teamId', String(teamId))
    return api.post<unknown>('/ibcc/submission/preliminary', form)
  },
}
