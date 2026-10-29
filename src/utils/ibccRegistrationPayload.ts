import type {
  IbccRegistrationForm,
  MemberArrangement,
  ParticipantInformation,
  RequirementKey,
} from '@/types/ibccRegistration'

/**
 * Maps the registration form onto what POST /ibcc/register expects
 * (back-end/src/features/ibcc/ibcc.schema.ts + ibcc.route.ts).
 */

const MEMBER_COMPOSITION: Record<Exclude<MemberArrangement, ''>, string> = {
  'same-university': 'SAME_UNIVERSITY',
  'multiple-universities': 'MULTIPLE_UNIVERSITIES',
}

/** sourceInfoEnum on the backend is a single value, so it takes only one of these. */
const SOURCE_INFO: Record<string, string> = {
  Instagram: 'INSTAGRAM',
  TikTok: 'TIKTOK',
  X: 'X',
  LinkedIn: 'LINKEDIN',
  'Friends/Family': 'FRIENDS_FAMILY',
  'Community or Media Partner': 'COMMUNITY_MEDIA_PARTNER',
  Others: 'OTHERS',
}

/** multer field names on the backend (services/storage.service.ts). */
const FILE_FIELD: Record<RequirementKey, string> = {
  studentId: 'ktm_file',
  instagram: 'follow_proof',
  twibbon: 'twibbon_proof',
  poster: 'poster_proof',
  broadcast: 'broadcast_proof',
}

/** The backend's per-file limit for registration proofs (10 MB). */
export const MAX_PROOF_FILE_BYTES = 10 * 1024 * 1024

/** The backend enum is lower-case: '1st year' ... '4th year'. */
const yearOfStudy = (year: string) => year.toLowerCase()

const toMember = (p: ParticipantInformation) => ({
  fullName: p.fullName.trim(),
  email: p.email.replace(/\s+/g, ''),
  whatsapp: p.whatsapp.trim(),
  institution: p.institutionMajor.trim(),
  yearOfStudy: yearOfStudy(p.year),
})

export function buildRegistrationFormData(form: IbccRegistrationForm): FormData {
  const data = new FormData()

  data.append('teamName', form.teamName.trim())
  data.append(
    'memberComposition',
    MEMBER_COMPOSITION[form.memberArrangement as Exclude<MemberArrangement, ''>],
  )
  // The form allows several sources; the backend stores one, so the first pick wins.
  data.append('sourceInfo', SOURCE_INFO[form.informationSources[0]] ?? 'OTHERS')

  // The leader's name and email come from the logged-in account (JWT), not from the body.
  const leader = form.leader
  data.append(
    'leaderInfo',
    JSON.stringify({
      whatsapp: leader.whatsapp.trim(),
      institution: leader.institutionMajor.trim(),
      yearOfStudy: yearOfStudy(leader.year),
    }),
  )
  data.append('members', JSON.stringify([toMember(form.firstMember), toMember(form.secondMember)]))

  data.append('agreeTerms', String(form.agreeToTerms))
  data.append('confirmParticipation', String(form.confirmParticipation))

  for (const key of Object.keys(FILE_FIELD) as RequirementKey[]) {
    const file = form.files[key]
    if (file) data.append(FILE_FIELD[key], file)
  }

  return data
}
