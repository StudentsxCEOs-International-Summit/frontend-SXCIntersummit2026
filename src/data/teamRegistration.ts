import type { Option } from '@/components/ibcc/FormControls'
import type { TeamRegistrationFormState } from '@/types/teamRegistration'

const toOptions = (list: string[]): Option[] => list.map((value) => ({ value, label: value }))

export const MAX_TOTAL_PARTICIPANTS = 5

export const ROLE_OPTIONS = toOptions(['Leader', 'Member', 'Co-Leader', 'Designer', 'Researcher'])

export const CITY_OPTIONS = toOptions([
  'Jakarta',
  'Bandung',
  'Surabaya',
  'Yogyakarta',
  'Balikpapan',
  'Other',
])

export const COUNTRY_CODES = ['+62', '+60', '+65']

export const CATEGORY_OPTIONS: {
  value: TeamRegistrationFormState['competitionCategory']
  label: string
}[] = [
  { value: 'business-case', label: 'Business Case Competition' },
  { value: 'marketing-challenge', label: 'Marketing Challenge' },
  { value: 'chambers', label: 'Chambers' },
  { value: 'ibpc', label: 'IBPC' },
]

export const INITIAL_FORM_STATE: TeamRegistrationFormState = {
  teamName: '',
  teamTag: '',
  institution: '',
  city: '',
  competitionCategory: '',
  contactEmail: '',
  whatsappCountryCode: '+62',
  whatsappNumber: '',
  twibbonFile: null,
  logoFile: null,
}
