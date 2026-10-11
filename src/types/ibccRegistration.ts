export type StudyYear = '' | '1st Year' | '2nd Year' | '3rd Year' | '4th Year'
export type MemberArrangement = '' | 'same-university' | 'multiple-universities'
export type ParticipantKey = 'leader' | 'firstMember' | 'secondMember'
export type RequirementKey = 'studentId' | 'instagram' | 'twibbon' | 'poster' | 'broadcast'

export interface ParticipantInformation {
  fullName: string
  email: string
  whatsapp: string
  institutionMajor: string
  year: StudyYear
}

export interface IbccRegistrationForm {
  teamName: string
  memberArrangement: MemberArrangement
  informationSources: string[]
  otherInformationSource: string
  leader: ParticipantInformation
  firstMember: ParticipantInformation
  secondMember: ParticipantInformation
  files: Record<RequirementKey, File | null>
  agreeToTerms: boolean
  confirmParticipation: boolean
}

export type RegistrationErrors = Record<string, string>
