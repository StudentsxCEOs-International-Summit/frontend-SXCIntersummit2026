export type CompetitionCategory = '' | 'business-case' | 'marketing-challenge' | 'chambers' | 'ibpc'

export interface TeamParticipant {
  id: string
  fullName: string
  email: string
  role: string
}

export interface TeamRegistrationFormState {
  teamName: string
  teamTag: string
  institution: string
  city: string
  competitionCategory: CompetitionCategory
  contactEmail: string
  whatsappCountryCode: string
  whatsappNumber: string
  twibbonFile: File | null
  logoFile: File | null
}
