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

const WHATSAPP_REGEX = /^(\+?[1-9]\d{7,14}|08[1-9]\d{6,10})$/

/** Matches backend `normalizePhone` so invisible Unicode marks pasted from WhatsApp/Contacts are stripped. */
export function normalizeWhatsappNumber(raw: string): string {
  const cleaned = raw.replace(/^[^\d+]+/, '')
  const hasLeadingPlus = cleaned.startsWith('+')
  const digitsOnly = cleaned.replace(/\D/g, '')
  if (!digitsOnly) return ''
  return hasLeadingPlus ? `+${digitsOnly}` : digitsOnly
}

export function isValidWhatsappNumber(raw: string): boolean {
  return WHATSAPP_REGEX.test(normalizeWhatsappNumber(raw))
}

const PARTICIPANT_PREFIX_LABEL: Record<string, string> = {
  leaderInfo: 'Team Leader',
  'members[0]': 'Member 1',
  'members.0': 'Member 1',
  'members[1]': 'Member 2',
  'members.1': 'Member 2',
}

const FIELD_LABEL: Record<string, string> = {
  fullName: 'Full Name',
  email: 'Email',
  whatsapp: 'WhatsApp Number',
  institution: 'Institution',
  major: 'Major',
  yearOfStudy: 'Year of Study',
}

/** Replaces raw backend field paths (e.g. `members[1].whatsapp`) with readable participant labels. */
export function formatRegistrationError(message: string): string {
  return message
    .replace(
      /\b(leaderInfo|members\[0\]|members\.0|members\[1\]|members\.1)\.(fullName|email|whatsapp|institution|major|yearOfStudy)\b/g,
      (_, who: string, field: string) => `${PARTICIPANT_PREFIX_LABEL[who]} ${FIELD_LABEL[field]}`,
    )
    .replace(/\bteamName\b/g, 'Team Name')
    .replace(/\bmemberComposition\b/g, 'Team Member Arrangement')
    .replace(/\bsourceInfo\b/g, 'Information Source')
    .replace(/\bagreeTerms\b/g, 'Terms & Conditions')
    .replace(/\bconfirmParticipation\b/g, 'Participation Confirmation')
}

const STEP_PREFIX_RULES: Array<[RegExp, number]> = [
  [/^(teamName|memberArrangement|informationSources|otherInformationSource)$/, 1],
  [/^leader\./, 2],
  [/^firstMember\./, 3],
  [/^secondMember\./, 4],
  [/^files\./, 5],
  [/^(agreeToTerms|confirmParticipation)$/, 6],
]

export function findEarliestErrorStep(errorKeys: string[]): number | null {
  let earliest: number | null = null
  for (const key of errorKeys) {
    const match = STEP_PREFIX_RULES.find(([pattern]) => pattern.test(key))
    if (match && (earliest === null || match[1] < earliest)) {
      earliest = match[1]
    }
  }
  return earliest
}

const toMember = (p: ParticipantInformation) => ({
  fullName: p.fullName.trim(),
  email: p.email.replace(/\s+/g, ''),
  whatsapp: normalizeWhatsappNumber(p.whatsapp),
  institution: p.institution.trim(),
  major: p.major.trim(),
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

  // The leader email comes from the authenticated account; the registration name is editable.
  const leader = form.leader
  data.append(
    'leaderInfo',
    JSON.stringify({
      fullName: leader.fullName.trim(),
      whatsapp: normalizeWhatsappNumber(leader.whatsapp),
      institution: leader.institution.trim(),
      major: leader.major.trim(),
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
