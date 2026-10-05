import { useState } from 'react'
import { INITIAL_FORM_STATE, MAX_TOTAL_PARTICIPANTS } from '@/data/teamRegistration'
import type { TeamParticipant, TeamRegistrationFormState } from '@/types/teamRegistration'
import { validateTeamRegistrationForm } from '@/utils/validation/teamRegistrationValidation'

export type FormErrors = ReturnType<typeof validateTeamRegistrationForm>

export type UpdateField = <K extends keyof TeamRegistrationFormState>(
  key: K,
) => (value: TeamRegistrationFormState[K]) => void

const createParticipant = (role: string): TeamParticipant => ({
  id: crypto.randomUUID(),
  fullName: '',
  email: '',
  role,
})

export function useTeamRegistrationForm() {
  const [form, setForm] = useState<TeamRegistrationFormState>(INITIAL_FORM_STATE)
  const [errors, setErrors] = useState<FormErrors>({})
  const [participants, setParticipants] = useState<TeamParticipant[]>([
    createParticipant('Leader'),
    createParticipant('Member'),
  ])

  const updateField: UpdateField = (key) => (value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const updateParticipant = (index: number, field: keyof TeamParticipant, value: string) =>
    setParticipants((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)))

  const addMember = () =>
    setParticipants((prev) =>
      prev.length >= MAX_TOTAL_PARTICIPANTS ? prev : [...prev, createParticipant('Member')],
    )

  const removeMember = (index: number) =>
    setParticipants((prev) => prev.filter((_, i) => i !== index))

  const validate = () => {
    const fieldErrors = validateTeamRegistrationForm(form)
    setErrors(fieldErrors)
    return Object.keys(fieldErrors).length === 0
  }

  return {
    form,
    errors,
    participants,
    emptySlots: MAX_TOTAL_PARTICIPANTS - participants.length,
    canAddMember: participants.length < MAX_TOTAL_PARTICIPANTS,
    updateField,
    updateParticipant,
    addMember,
    removeMember,
    validate,
  }
}
