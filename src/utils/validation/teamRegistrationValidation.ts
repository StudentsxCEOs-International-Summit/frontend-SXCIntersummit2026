import type { TeamRegistrationFormState } from '@/types/teamRegistration'

export type TeamRegistrationErrors = Partial<
  Record<
    | 'teamName'
    | 'teamTag'
    | 'institution'
    | 'city'
    | 'competitionCategory'
    | 'contactEmail'
    | 'whatsappNumber'
    | 'twibbonFile',
    string
  >
>

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^\d{8,15}$/

export function validateTeamRegistrationForm(
  form: TeamRegistrationFormState,
): TeamRegistrationErrors {
  const errors: TeamRegistrationErrors = {}

  if (!form.teamName.trim()) errors.teamName = 'Team name is required'
  if (!form.teamTag.trim()) errors.teamTag = 'Team short name / tag is required'
  if (!form.institution.trim()) errors.institution = 'Institution is required'
  if (!form.city.trim()) errors.city = 'City is required'
  if (!form.competitionCategory) errors.competitionCategory = 'Please select a category'

  if (!form.contactEmail.trim()) {
    errors.contactEmail = 'Contact email is required'
  } else if (!EMAIL_REGEX.test(form.contactEmail)) {
    errors.contactEmail = 'Enter a valid email address'
  }

  if (!form.whatsappNumber.trim()) {
    errors.whatsappNumber = 'WhatsApp number is required'
  } else if (!PHONE_REGEX.test(form.whatsappNumber.replace(/\s/g, ''))) {
    errors.whatsappNumber = 'Enter a valid phone number'
  }

  if (!form.twibbonFile) errors.twibbonFile = 'Please upload your twibbon'

  return errors
}
