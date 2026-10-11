import { ChoiceCard, RegistrationLink } from './RegistrationFields'
import type { RegistrationErrors } from '@/types/ibccRegistration'

interface RegistrationClosingStepProps {
  agreeToTerms: boolean
  confirmParticipation: boolean
  errors: RegistrationErrors
  onAgreeToTermsChange: (checked: boolean) => void
  onConfirmParticipationChange: (checked: boolean) => void
}

export default function RegistrationClosingStep({
  agreeToTerms,
  confirmParticipation,
  errors,
  onAgreeToTermsChange,
  onConfirmParticipationChange,
}: RegistrationClosingStepProps) {
  return (
    <div className="space-y-6">
      <div className="py-3 text-center">
        <h2 className="font-heading text-2xl font-bold text-primary">
          Thank You for Joining International Business Case Competition
        </h2>
        <p className="mt-2 text-sm font-medium text-slate-600">SxC International Summit 2026</p>
      </div>

      <fieldset
        className={`rounded-xl border p-4 sm:p-5 ${
          errors.agreeToTerms ? 'border-red-300 bg-red-50/30' : 'border-[#E1EAF5] bg-[#F9FBFE]'
        }`}
      >
        <legend className="px-1 text-sm font-semibold text-slate-900">
          Do You Agree to the Terms and Conditions of the Competition?
        </legend>
        <div
          tabIndex={0}
          role="region"
          aria-label="Competition Terms and Conditions"
          className="mb-4 max-h-56 overflow-y-auto rounded-xl border border-[#DCE7F4] bg-white px-4 py-4 text-[13px] leading-5 text-slate-600 shadow-inner shadow-slate-100/70 focus:outline-none focus:ring-2 focus:ring-[#2D83F5] sm:px-5"
        >
          <h3 className="text-sm font-semibold tracking-tight text-slate-900">Before you agree</h3>
          <p className="mt-1.5 text-xs leading-[1.35rem] text-slate-500">
            Please review this summary before continuing. The Guidebook contains the complete
            official competition terms.
          </p>
          <div className="my-3 h-px bg-[#E8EEF6]" />
          <p className="font-medium text-slate-700">
            By submitting this registration, your team confirms that:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 marker:text-[#2874D8]">
            <li>It consists of three members, and each member’s information is accurate.</li>
            <li>It has completed and submitted the participation proofs requested in this form.</li>
            <li>It is committed to participating in IBCC 2026.</li>
          </ul>
          <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-[#E8EEF6] pt-3 text-xs">
            <RegistrationLink linkKey="guidebook">Read the Guidebook</RegistrationLink>
            <span className="text-slate-400">(The link currently directs to the home page.)</span>
          </div>
        </div>
        <ChoiceCard
          name="agreeToTerms"
          value="yes"
          label="Yes, I agree"
          checked={agreeToTerms}
          onChange={(_, checked) => onAgreeToTermsChange(checked)}
        />
        {errors.agreeToTerms && (
          <p className="mt-1.5 text-xs text-red-600" role="alert">
            {errors.agreeToTerms}
          </p>
        )}
      </fieldset>

      <fieldset
        className={`rounded-xl border p-4 sm:p-5 ${
          errors.confirmParticipation
            ? 'border-red-300 bg-red-50/30'
            : 'border-[#E1EAF5] bg-[#F9FBFE]'
        }`}
      >
        <legend className="px-1 text-sm font-semibold text-slate-900">
          Confirmation of Participation
        </legend>
        <p className="mb-3 text-sm leading-6 text-slate-600">
          By submitting this form, you confirm that all information provided is accurate and that
          your team is committed to participating in IBCC 2026.
        </p>
        <ChoiceCard
          name="confirmParticipation"
          value="confirm"
          label="I confirm"
          checked={confirmParticipation}
          onChange={(_, checked) => onConfirmParticipationChange(checked)}
        />
        {errors.confirmParticipation && (
          <p className="mt-1.5 text-xs text-red-600" role="alert">
            {errors.confirmParticipation}
          </p>
        )}
      </fieldset>
    </div>
  )
}
