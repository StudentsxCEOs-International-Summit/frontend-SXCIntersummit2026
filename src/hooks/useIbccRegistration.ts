import { useEffect, useState } from 'react'
import { INITIAL_FORM, REGISTRATION_STEPS, REQUIREMENTS } from '@/data/ibccRegistration'
import { ApiError } from '@/lib/api'
import { ibccService, type RegisteredTeam } from '@/services/ibcc'
import { buildRegistrationFormData, MAX_PROOF_FILE_BYTES } from '@/utils/ibccRegistrationPayload'
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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Backend validation errors use paths like `members.0.email`; point them at our form keys. */
function toFormErrorKey(path: string): string | null {
  if (path === 'teamName') return 'teamName'
  if (path === 'memberComposition') return 'memberArrangement'
  if (path === 'sourceInfo') return 'informationSources'
  if (path === 'agreeTerms') return 'agreeToTerms'
  if (path === 'confirmParticipation') return 'confirmParticipation'

  const leader = path.match(/^leaderInfo\.(whatsapp|institution|yearOfStudy)$/)
  if (leader) return `leader.${leader[1] === 'institution' ? 'institutionMajor' : leader[1] === 'yearOfStudy' ? 'year' : 'whatsapp'}`

  const member = path.match(/^members\.(\d)\.(fullName|email|whatsapp|institution|yearOfStudy)$/)
  if (member) {
    const who = member[1] === '0' ? 'firstMember' : 'secondMember'
    const field = member[2] === 'institution' ? 'institutionMajor' : member[2] === 'yearOfStudy' ? 'year' : member[2]
    return `${who}.${field}`
  }
  return null
}

interface UseIbccRegistrationOptions {
  /** Name/email of the logged-in account: the backend takes the leader's identity from the session. */
  leaderDefaults?: { fullName: string; email: string }
}

export function useIbccRegistration({ leaderDefaults }: UseIbccRegistrationOptions = {}) {
  const [form, setForm] = useState<IbccRegistrationForm>(INITIAL_FORM)
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<RegistrationErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [result, setResult] = useState<RegisteredTeam | null>(null)

  // Prefill the leader from the account (those two fields are locked in the form).
  useEffect(() => {
    if (!leaderDefaults) return
    setForm((current) => ({
      ...current,
      leader: {
        ...current.leader,
        fullName: leaderDefaults.fullName,
        email: leaderDefaults.email,
      },
    }))
  }, [leaderDefaults?.fullName, leaderDefaults?.email]) // eslint-disable-line react-hooks/exhaustive-deps

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
    if (file && file.size > MAX_PROOF_FILE_BYTES) {
      setErrors((current) => ({
        ...current,
        [`files.${key}`]: 'File is too large. The maximum size is 10 MB.',
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

    if (step === 1) {
      const name = form.teamName.trim()
      if (!name) nextErrors.teamName = 'Team name is required.'
      else if (name.length < 3) nextErrors.teamName = 'Team name must be at least 3 characters.'
      else if (name.length > 50) nextErrors.teamName = 'Team name must be 50 characters or fewer.'
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
      if (participant.email.replace(/\s+/g, '') && !EMAIL_PATTERN.test(participant.email.replace(/\s+/g, ''))) {
        nextErrors[`${participantKey}.email`] = 'Enter a valid email address.'
      }
      // Same minimums as the backend schema.
      if (participant.fullName.trim() && participant.fullName.trim().length < 2)
        nextErrors[`${participantKey}.fullName`] = 'Full name must be at least 2 characters.'
      if (participant.whatsapp.trim() && participant.whatsapp.trim().length < 8)
        nextErrors[`${participantKey}.whatsapp`] = 'Enter a valid WhatsApp number.'
      if (participant.institutionMajor.trim() && participant.institutionMajor.trim().length < 3)
        nextErrors[`${participantKey}.institutionMajor`] = 'Enter your institution and major.'

      // The backend rejects repeated emails and a member that reuses the leader's email.
      if (participantKey !== 'leader' && participant.email.replace(/\s+/g, '')) {
        const email = participant.email.replace(/\s+/g, '').toLowerCase()
        const others: string[] = [form.leader.email]
        if (participantKey === 'secondMember') others.push(form.firstMember.email)
        if (others.some((other) => other.replace(/\s+/g, '').toLowerCase() === email)) {
          nextErrors[`${participantKey}.email`] = 'Each team member needs a different email address.'
        }
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

  const submit = async () => {
    setSubmitError(null)
    setSubmitting(true)
    try {
      const team = await ibccService.registerTeam(buildRegistrationFormData(form))
      setResult(team)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      if (error instanceof ApiError) {
        setSubmitError(error.message)

        // Surface backend field errors next to the right input and jump back to that step.
        const mapped: RegistrationErrors = {}
        for (const [path, message] of Object.entries(error.fieldErrors)) {
          const key = toFormErrorKey(path)
          if (key) mapped[key] = message
        }
        if (Object.keys(mapped).length > 0) setErrors((current) => ({ ...current, ...mapped }))
      } else {
        setSubmitError('Something went wrong. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  const continueStep = () => {
    if (submitting) return false
    if (!validateStep()) return false
    if (step < REGISTRATION_STEPS.length - 1) {
      setSubmitError(null)
      setStep((current) => current + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return true
    }
    void submit()
    return true
  }

  const previousStep = () => {
    setErrors({})
    setSubmitError(null)
    setStep((current) => Math.max(0, current - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return {
    form,
    step,
    errors,
    /** True once the backend accepted the registration. */
    submitted: result !== null,
    result,
    submitting,
    submitError,
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
