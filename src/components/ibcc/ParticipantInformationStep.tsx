import { FormField, ChoiceCard, REGISTRATION_INPUT_CLASS } from './RegistrationFields'
import { STUDY_YEARS } from '@/data/ibccRegistration'
import type {
  ParticipantInformation,
  ParticipantKey,
  RegistrationErrors,
  StudyYear,
} from '@/types/ibccRegistration'

interface ParticipantInformationStepProps {
  participantKey: ParticipantKey
  participant: ParticipantInformation
  errors: RegistrationErrors
  onChange: (field: keyof ParticipantInformation, value: string) => void
  /** Fields shown but not editable (the leader's name/email come from the account). */
  readOnlyFields?: (keyof ParticipantInformation)[]
}

const PARTICIPANT_FIELDS: {
  key: Exclude<keyof ParticipantInformation, 'year'>
  label: string
  type?: string
  placeholder: string
}[] = [
  { key: 'fullName', label: 'Full Name', placeholder: 'Enter full name' },
  { key: 'email', label: 'Email', type: 'email', placeholder: 'name@example.com' },
  { key: 'whatsapp', label: 'WhatsApp Number', type: 'tel', placeholder: '+6281234516789' },
  { key: 'institution', label: 'Institution', placeholder: 'Universitas Indonesia' },
  { key: 'major', label: 'Major', placeholder: 'Management' },
]

export default function ParticipantInformationStep({
  participantKey,
  participant,
  errors,
  onChange,
  readOnlyFields = [],
}: ParticipantInformationStepProps) {
  return (
    <div className="space-y-5">
      {PARTICIPANT_FIELDS.map(({ key, label, type = 'text', placeholder }) => {
        const id = `${participantKey}-${key}`
        const error = errors[`${participantKey}.${key}`]

        return (
          <FormField key={key} id={id} label={label} error={error}>
            <input
              id={id}
              type={type}
              autoComplete={key === 'fullName' ? 'name' : key === 'email' ? 'email' : undefined}
              value={participant[key]}
              placeholder={placeholder}
              aria-invalid={!!error}
              readOnly={readOnlyFields.includes(key)}
              className={`${REGISTRATION_INPUT_CLASS}${
                readOnlyFields.includes(key) ? ' cursor-not-allowed bg-slate-50 text-slate-500' : ''
              }`}
              onChange={(event) => onChange(key, event.target.value)}
            />
          </FormField>
        )
      })}

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-slate-800">
          Year of Study<span className="ml-1 text-red-500">*</span>
        </legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STUDY_YEARS.map((year) => (
            <ChoiceCard
              key={year}
              name={`${participantKey}-year`}
              value={year}
              label={year}
              checked={participant.year === year}
              onChange={(value) => onChange('year', value as StudyYear)}
            />
          ))}
        </div>
        {errors[`${participantKey}.year`] && (
          <p className="mt-1.5 text-xs text-red-600" role="alert">
            {errors[`${participantKey}.year`]}
          </p>
        )}
      </fieldset>
    </div>
  )
}
