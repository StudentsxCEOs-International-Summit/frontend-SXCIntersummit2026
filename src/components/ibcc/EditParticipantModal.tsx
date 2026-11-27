import { useEffect, useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import { ContactTeamText } from '@/components/ContactTeamText'
import { STUDY_YEARS } from '@/data/ibccRegistration'
import { ApiError } from '@/lib/api'
import type { EditableParticipantDetails, UpdateMyTeamPayload } from '@/services/ibcc'
import {
  formatRegistrationError,
  isValidWhatsappNumber,
  normalizeWhatsappNumber,
} from '@/utils/ibccRegistrationPayload'
import { ChoiceCard, FormField, REGISTRATION_INPUT_CLASS } from './RegistrationFields'

export interface EditableParticipantTarget {
  kind: 'leader' | 'member'
  userId: number
  name: string
  email: string
  whatsapp: string | null
  institution: string | null
  major: string | null
  yearOfStudy: string | null
}

type EditableFieldKey = keyof EditableParticipantDetails
type EditableFormState = Required<EditableParticipantDetails>
type FieldErrors = Partial<Record<EditableFieldKey, string>>

const EDITABLE_TEXT_FIELDS: Array<{
  key: Exclude<EditableFieldKey, 'yearOfStudy'>
  label: string
  type: 'text' | 'tel'
  placeholder?: string
}> = [
  { key: 'fullName', label: 'Full Name', type: 'text' },
  {
    key: 'whatsapp',
    label: 'WhatsApp Number',
    type: 'tel',
    placeholder: '08123456789 or +628123456789',
  },
  { key: 'institution', label: 'Institution', type: 'text' },
  { key: 'major', label: 'Major', type: 'text' },
]

interface EditParticipantModalProps {
  teamName: string
  target: EditableParticipantTarget
  onClose: () => void
  onSave: (payload: UpdateMyTeamPayload) => Promise<void>
}

function matchStudyYear(rawYear: string | null): string {
  if (!rawYear) return ''
  const normalized = rawYear.trim().toLowerCase()
  return STUDY_YEARS.find((year) => year.toLowerCase() === normalized) ?? ''
}

function validateForm(form: EditableFormState): FieldErrors {
  const next: FieldErrors = {}
  if (form.fullName.trim().length < 2) next.fullName = 'Full name must be at least 2 characters.'
  if (!isValidWhatsappNumber(form.whatsapp)) {
    next.whatsapp = 'Please enter a valid WhatsApp number (e.g. 08123456789 or +628123456789).'
  }
  if (form.institution.trim().length < 2) next.institution = 'Institution is required.'
  if (form.major.trim().length < 2) next.major = 'Major is required.'
  if (!form.yearOfStudy) next.yearOfStudy = 'Please select a year of study.'
  return next
}

export default function EditParticipantModal({
  teamName,
  target,
  onClose,
  onSave,
}: EditParticipantModalProps) {
  const [form, setForm] = useState<EditableFormState>(() => ({
    fullName: target.name,
    whatsapp: target.whatsapp ?? '',
    institution: target.institution ?? '',
    major: target.major ?? '',
    yearOfStudy: matchStudyYear(target.yearOfStudy),
  }))
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !saving) onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose, saving])

  const updateField = (key: EditableFieldKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setSubmitError(null)
    const nextErrors = validateForm(form)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    const details: EditableParticipantDetails = {
      fullName: form.fullName.trim(),
      whatsapp: normalizeWhatsappNumber(form.whatsapp),
      institution: form.institution.trim(),
      major: form.major.trim(),
      yearOfStudy: form.yearOfStudy.toLowerCase(),
    }

    const payload: UpdateMyTeamPayload =
      target.kind === 'leader'
        ? { leader: details }
        : { members: [{ userId: target.userId, ...details }] }

    setSaving(true)
    try {
      await onSave(payload)
    } catch (err) {
      setSubmitError(
        err instanceof ApiError
          ? formatRegistrationError(err.message)
          : 'Failed to update details. Please try again.',
      )
    } finally {
      setSaving(false)
    }
  }

  const roleLabel = target.kind === 'leader' ? 'Team Leader' : 'Team Member'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#061A40]/60 px-4 py-6 backdrop-blur-sm"
      onClick={() => {
        if (!saving) onClose()
      }}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-participant-title"
        onClick={(event) => event.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-[#E1EAF5] bg-white p-6 shadow-2xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-wider text-[#1748be] uppercase">{roleLabel}</p>
            <h2
              id="edit-participant-title"
              className="font-heading mt-0.5 text-xl font-extrabold text-slate-900"
            >
              Edit Participant Details
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="Close modal"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
          <FormField id="edit-team-name" label="Team Name" required={false}>
            <input
              id="edit-team-name"
              type="text"
              value={teamName}
              disabled
              className={`${REGISTRATION_INPUT_CLASS} cursor-not-allowed bg-slate-50 text-slate-500`}
            />
            <p className="mt-1 text-xs text-slate-500">Team name cannot be changed.</p>
          </FormField>

          <FormField id="edit-email" label="Email" required={false}>
            <input
              id="edit-email"
              type="email"
              value={target.email}
              disabled
              className={`${REGISTRATION_INPUT_CLASS} cursor-not-allowed bg-slate-50 text-slate-500`}
            />
            <p className="mt-1 text-xs text-slate-500">Email cannot be changed.</p>
          </FormField>

          {EDITABLE_TEXT_FIELDS.map(({ key, label, type, placeholder }) => (
            <FormField key={key} id={`edit-${key}`} label={label} error={errors[key]}>
              <input
                id={`edit-${key}`}
                type={type}
                value={form[key]}
                placeholder={placeholder}
                onChange={(event) => updateField(key, event.target.value)}
                className={REGISTRATION_INPUT_CLASS}
              />
            </FormField>
          ))}

          <fieldset>
            <legend className="mb-2 text-sm font-medium text-slate-800">
              Year of Study<span className="ml-1 text-red-500">*</span>
            </legend>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {STUDY_YEARS.map((year) => (
                <ChoiceCard
                  key={year}
                  name="edit-year-of-study"
                  value={year}
                  label={year}
                  checked={form.yearOfStudy === year}
                  onChange={(value) => updateField('yearOfStudy', value)}
                />
              ))}
            </div>
            {errors.yearOfStudy && (
              <p className="mt-1.5 text-xs text-red-600" role="alert">
                {errors.yearOfStudy}
              </p>
            )}
          </fieldset>

          {submitError && (
            <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600">
              <ContactTeamText text={submitError} />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="cursor-pointer rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="cursor-pointer rounded-full bg-[#0b4fd1] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#093ea6] disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
