import type {
  IbccRegistrationForm,
  ParticipantInformation,
  RequirementKey,
  StudyYear,
} from '@/types/ibccRegistration'

export const EMPTY_PARTICIPANT: ParticipantInformation = {
  fullName: '',
  email: '',
  whatsapp: '',
  institution: '',
  major: '',
  year: '',
}

export const INITIAL_FORM: IbccRegistrationForm = {
  teamName: '',
  memberArrangement: '',
  informationSources: [],
  otherInformationSource: '',
  leader: { ...EMPTY_PARTICIPANT },
  firstMember: { ...EMPTY_PARTICIPANT },
  secondMember: { ...EMPTY_PARTICIPANT },
  files: {
    studentId: null,
    instagram: null,
    twibbon: null,
    poster: null,
    broadcast: null,
  },
  agreeToTerms: false,
  confirmParticipation: false,
}

export const REGISTRATION_STEPS = [
  'Cover',
  'Team Information',
  'Team Leader',
  '1st Member',
  '2nd Member',
  'Requirements',
  'Closing',
] as const

export const INFORMATION_SOURCES = [
  'Instagram',
  'TikTok',
  'X',
  'LinkedIn',
  'Friends/Family',
  'Community or Media Partner',
  'Others',
]

export const STUDY_YEARS: StudyYear[] = ['1st Year', '2nd Year', '3rd Year', '4th Year']

export const REQUIREMENTS: {
  key: RequirementKey
  title: string
  description: string
}[] = [
  {
    key: 'studentId',
    title: 'Student Identification Card',
    description:
      'Upload one file containing the Student Identification Cards of all three team members.',
  },
  {
    key: 'instagram',
    title: 'Follow Our Instagram Accounts',
    description:
      'Upload one file containing proof that all three members follow @sxcintersummit and @sxcintersummitcompetition.',
  },
  {
    key: 'twibbon',
    title: 'Upload Your Twibbon',
    description:
      'Compile proof from all three members into one file. Each member must post the official Twibbon on their primary public Instagram account, use the Registration Kit caption, and tag us.',
  },
  {
    key: 'poster',
    title: 'Share the Poster',
    description:
      'Compile proof from all three members into one file. Each member must repost the official poster to their primary public Instagram story and tag us.',
  },
  {
    key: 'broadcast',
    title: 'Share the Broadcast',
    description:
      'Compile nine screenshots into one file: three different groups per member, with successful delivery shown.',
  },
]
