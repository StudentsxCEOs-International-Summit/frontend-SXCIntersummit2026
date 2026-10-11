import { useState } from 'react'
import { INITIAL_FORM, REGISTRATION_STEPS, REQUIREMENTS } from '@/data/ibccRegistration'
import type {
  IbccRegistrationForm,
  ParticipantInformation,
  ParticipantKey,
  RegistrationErrors,
  RequirementKey,
} from '@/types/ibccRegistration'

function isAllowedUpload(file: File) {
  const extension = file.name.split('.').pop()?.toLowerCase()
  return (
    ['jpg', 'jpeg', 'pdf'].includes(extension ?? '') &&
    (file.type === '' || ['image/jpeg', 'application/pdf'].includes(file.type.toLowerCase()))
  )
}

export function useIbccRegistration() {
  const [form, setForm] = useState<IbccRegistrationForm>(INITIAL_FORM)
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<RegistrationErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const clearError = (key: string) => setErrors((current) => ({ ...current, [key]: '' }))

  const updateTeamName = (teamName: string) => {
    setForm((current) => ({ ...current, teamName }))
    clearError('teamName')
  }

  const updateMemberArrangement = (
    memberArrangement: IbccRegistrationForm['memberArrangement'],
  ) => {
    setForm((current) => ({ ...current, memberArrangement }))
    clearError('memberArrangement')
  }

  const updateParticipant = (
    participantKey: ParticipantKey,
    field: keyof ParticipantInformation,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      [participantKey]: { ...current[participantKey], [field]: value },
    }))
    clearError(`${participantKey}.${field}`)
  }

  const toggleInformationSource = (source: string, checked: boolean) => {
    setForm((current) => ({
      ...current,
      informationSources: checked
        ? [...current.informationSources, source]
        : current.informationSources.filter((item) => item !== source),
    }))
    clearError('informationSources')
  }

  const updateOtherInformationSource = (otherInformationSource: string) => {
    setForm((current) => ({ ...current, otherInformationSource }))
    clearError('otherInformationSource')
  }

  const updateFile = (key: RequirementKey, file: File | null) => {
    if (file && !isAllowedUpload(file)) {
      setErrors((current) => ({
        ...current,
        [`files.${key}`]: 'Only JPG or PDF files are accepted.',
      }))
      return
    }
    setForm((current) => ({ ...current, files: { ...current.files, [key]: file } }))
    clearError(`files.${key}`)
  }

  const updateAgreement = (agreeToTerms: boolean) => {
    setForm((current) => ({ ...current, agreeToTerms }))
    clearError('agreeToTerms')
  }

  const updateParticipationConfirmation = (confirmParticipation: boolean) => {
    setForm((current) => ({ ...current, confirmParticipation }))
    clearError('confirmParticipation')
  }

  const validateStep = () => {
    const nextErrors: RegistrationErrors = {}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (step === 1) {
      if (!form.teamName.trim()) nextErrors.teamName = 'Team name is required.'
      if (!form.memberArrangement)
        nextErrors.memberArrangement = 'Select one team member arrangement.'
      if (form.informationSources.length === 0)
        nextErrors.informationSources = 'Select at least one information source.'
      if (form.informationSources.includes('Others') && !form.otherInformationSource.trim())
        nextErrors.otherInformationSource = 'Please specify where you found us.'
    }

    if (step >= 2 && step <= 4) {
      const participantKey: ParticipantKey =
        step === 2 ? 'leader' : step === 3 ? 'firstMember' : 'secondMember'
      const participant = form[participantKey]
      const requiredFields: (keyof ParticipantInformation)[] = [
        'fullName',
        'email',
        'whatsapp',
        'institutionMajor',
        'year',
      ]

      requiredFields.forEach((field) => {
        if (!participant[field].trim()) {
          nextErrors[`${participantKey}.${field}`] = 'This field is required.'
        }
      })
      if (participant.email && !emailPattern.test(participant.email)) {
        nextErrors[`${participantKey}.email`] = 'Enter a valid email address.'
      }
    }

    if (step === 5) {
      REQUIREMENTS.forEach(({ key }) => {
        if (!form.files[key]) nextErrors[`files.${key}`] = 'Please upload this file.'
      })
    }

    if (step === 6) {
      if (!form.agreeToTerms) nextErrors.agreeToTerms = 'Agreement is required.'
      if (!form.confirmParticipation)
        nextErrors.confirmParticipation = 'Please confirm your participation.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const continueStep = () => {
    if (!validateStep()) return false
    if (step < REGISTRATION_STEPS.length - 1) {
      setStep((current) => current + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return true
    }
    setSubmitted(true)
    return true
  }

  const previousStep = () => {
    setErrors({})
    setStep((current) => Math.max(0, current - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return {
    form,
    step,
    errors,
    submitted,
    updateTeamName,
    updateMemberArrangement,
    updateParticipant,
    toggleInformationSource,
    updateOtherInformationSource,
    updateFile,
    updateAgreement,
    updateParticipationConfirmation,
    continueStep,
    previousStep,
  }
}
