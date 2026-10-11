import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import RegistrationNavbar from '@/components/ibcc/RegistrationNavbar'
import RegistrationBackground from '@/components/ibcc/RegistrationBackground'
import ParticipantInformationStep from '@/components/ibcc/ParticipantInformationStep'
import RegistrationClosingStep from '@/components/ibcc/RegistrationClosingStep'
import RegistrationRequirementsStep from '@/components/ibcc/RegistrationRequirementsStep'
import TeamInformationStep from '@/components/ibcc/TeamInformationStep'
import Button from '@/components/ui/Button'
import { REGISTRATION_STEPS } from '@/data/ibccRegistration'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useIbccRegistration } from '@/hooks/useIbccRegistration'
import type { ParticipantKey } from '@/types/ibccRegistration'

export default function TeamRegistrationPage() {
  usePageTitle('IBCC Team Registration')

  const {
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
  } = useIbccRegistration()

  const renderStep = () => {
    if (submitted) {
      return (
        <div className="py-8 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" />
          <h2 className="mt-4 font-heading text-2xl font-bold text-primary">
            Thank You for Joining
          </h2>
          <p className="mt-2 text-slate-600">
            International Business Case Competition - SxC International Summit 2026
          </p>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-slate-500">
            Your registration details are ready. This page currently keeps the form data in this
            browser session; it is not connected to a submission service yet.
          </p>
        </div>
      )
    }

    if (step === 0) {
      return (
        <div className="py-10 text-center sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2874D8]">
            Welcome to
          </p>
          <h2 className="mx-auto mt-3 max-w-3xl font-heading text-3xl leading-tight font-extrabold text-primary sm:text-4xl">
            International Business Case Competition
          </h2>
          <p className="mt-3 text-lg font-semibold text-slate-600">SxC International Summit 2026</p>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-slate-500">
            Complete the team information, participant details, and required proof files to register
            your three-member team.
          </p>
        </div>
      )
    }

    if (step === 1) {
      return (
        <TeamInformationStep
          form={form}
          errors={errors}
          onTeamNameChange={updateTeamName}
          onArrangementChange={updateMemberArrangement}
          onInformationSourceChange={toggleInformationSource}
          onOtherSourceChange={updateOtherInformationSource}
        />
      )
    }

    if (step >= 2 && step <= 4) {
      const participantKey: ParticipantKey =
        step === 2 ? 'leader' : step === 3 ? 'firstMember' : 'secondMember'

      return (
        <ParticipantInformationStep
          participantKey={participantKey}
          participant={form[participantKey]}
          errors={errors}
          onChange={(field, value) => updateParticipant(participantKey, field, value)}
        />
      )
    }

    if (step === 5) {
      return (
        <RegistrationRequirementsStep
          files={form.files}
          errors={errors}
          onFileChange={updateFile}
        />
      )
    }

    return (
      <RegistrationClosingStep
        agreeToTerms={form.agreeToTerms}
        confirmParticipation={form.confirmParticipation}
        errors={errors}
        onAgreeToTermsChange={updateAgreement}
        onConfirmParticipationChange={updateParticipationConfirmation}
      />
    )
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#EDF4FF] via-[#F6FAFF] to-white">
      <RegistrationBackground />
      <RegistrationNavbar />

      <main className="relative z-10 mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-3 h-1.5 w-16 rounded-sm bg-[#F2B10E]" />
        <h1 className="font-heading text-3xl font-extrabold text-primary sm:text-4xl">
          IBCC <span className="text-[#009CF1]">Team Registration</span>
        </h1>
        <p className="mt-2 text-sm text-[#667085]">
          International Business Case Competition - SxC International Summit 2026
        </p>

        {!submitted && (
          <div className="mt-7" aria-label={`Step ${step + 1} of ${REGISTRATION_STEPS.length}`}>
            <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500">
              <span>
                Step {step + 1} of {REGISTRATION_STEPS.length}
              </span>
              <span>{REGISTRATION_STEPS[step]}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#DDE8F6]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#0A60F5] to-[#24A0F2] transition-all"
                style={{ width: `${((step + 1) / REGISTRATION_STEPS.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        <section className="mt-6 rounded-3xl border border-white bg-white/95 p-5 shadow-[0_16px_45px_rgba(30,64,175,0.10)] sm:p-8">
          {!submitted && step > 0 && (
            <div className="mb-6 border-b border-[#E8EEF6] pb-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#2874D8]">
                {REGISTRATION_STEPS[step]}
              </p>
              <h2 className="mt-1 font-heading text-xl font-bold text-slate-900">
                {step === 1
                  ? 'Team Information'
                  : step >= 2 && step <= 4
                    ? `${REGISTRATION_STEPS[step]} Information`
                    : step === 5
                      ? 'All Team Members Are Required to Fulfill the Requirements Below'
                      : 'Final Confirmation'}
              </h2>
            </div>
          )}

          {renderStep()}

          {!submitted && (
            <footer className="mt-8 flex flex-col-reverse items-center justify-between gap-4 border-t border-[#E8EEF6] pt-5 sm:flex-row">
              <Button
                variant="link"
                onClick={previousStep}
                disabled={step === 0}
                className={step === 0 ? 'invisible' : ''}
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <Button onClick={continueStep}>
                {step === REGISTRATION_STEPS.length - 1 ? 'Submit Registration' : 'Continue'}
                {step < REGISTRATION_STEPS.length - 1 && <ArrowRight className="h-4 w-4" />}
              </Button>
            </footer>
          )}
        </section>
        <p className="mt-4 text-center text-xs text-slate-400">
          Your information is intended for IBCC 2026 registration and event administration.
        </p>
      </main>
    </div>
  )
}
