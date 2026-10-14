import { ChoiceCard, FormField, REGISTRATION_INPUT_CLASS } from './RegistrationFields'
import { INFORMATION_SOURCES } from '@/data/ibccRegistration'
import type { IbccRegistrationForm, RegistrationErrors } from '@/types/ibccRegistration'

interface TeamInformationStepProps {
  form: IbccRegistrationForm
  errors: RegistrationErrors
  onTeamNameChange: (value: string) => void
  onArrangementChange: (value: IbccRegistrationForm['memberArrangement']) => void
  onInformationSourceChange: (source: string, checked: boolean) => void
  onOtherSourceChange: (value: string) => void
}

export default function TeamInformationStep({
  form,
  errors,
  onTeamNameChange,
  onArrangementChange,
  onInformationSourceChange,
  onOtherSourceChange,
}: TeamInformationStepProps) {
  return (
    <div className="space-y-6">
      <FormField id="teamName" label="Team Name" error={errors.teamName}>
        <input
          id="teamName"
          value={form.teamName}
          placeholder="Enter your team name"
          aria-invalid={!!errors.teamName}
          className={REGISTRATION_INPUT_CLASS}
          onChange={(event) => onTeamNameChange(event.target.value)}
        />
      </FormField>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-slate-800">
          Team Member Detail<span className="ml-1 text-red-500">*</span>
          <span className="ml-2 text-xs font-normal text-slate-500">Choose one</span>
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <ChoiceCard
            name="memberArrangement"
            value="same-university"
            label="Same University Students"
            checked={form.memberArrangement === 'same-university'}
            onChange={(value) =>
              onArrangementChange(value as IbccRegistrationForm['memberArrangement'])
            }
          />
          <ChoiceCard
            name="memberArrangement"
            value="multiple-universities"
            label="Multiple University Students"
            checked={form.memberArrangement === 'multiple-universities'}
            onChange={(value) =>
              onArrangementChange(value as IbccRegistrationForm['memberArrangement'])
            }
          />
        </div>
        {errors.memberArrangement && (
          <p className="mt-1.5 text-xs text-red-600" role="alert">
            {errors.memberArrangement}
          </p>
        )}
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-slate-800">
          Where did you find information about IBCC SxC International Summit 2026?
          <span className="ml-1 text-red-500">*</span>
          <span className="ml-2 text-xs font-normal text-slate-500">Choose all that apply</span>
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {INFORMATION_SOURCES.map((source) => (
            <ChoiceCard
              key={source}
              name="informationSources"
              value={source}
              label={source}
              type="checkbox"
              checked={form.informationSources.includes(source)}
              onChange={onInformationSourceChange}
            />
          ))}
        </div>
        {errors.informationSources && (
          <p className="mt-1.5 text-xs text-red-600" role="alert">
            {errors.informationSources}
          </p>
        )}
        {form.informationSources.includes('Others') && (
          <div className="mt-4">
            <FormField
              id="otherInformationSource"
              label="Please specify"
              error={errors.otherInformationSource}
            >
              <input
                id="otherInformationSource"
                value={form.otherInformationSource}
                placeholder="Tell us where you found the information"
                aria-invalid={!!errors.otherInformationSource}
                className={REGISTRATION_INPUT_CLASS}
                onChange={(event) => onOtherSourceChange(event.target.value)}
              />
            </FormField>
          </div>
        )}
      </fieldset>
    </div>
  )
}
