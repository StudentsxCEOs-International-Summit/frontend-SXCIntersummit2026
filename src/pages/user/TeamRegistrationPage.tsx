import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ShieldCheck, Save } from 'lucide-react'
import RegistrationNavbar from '@/components/ibcc/RegistrationNavbar'
import RegistrationBackground from '@/components/ibcc/RegistrationBackground'
import TeamInformationForm from '@/components/ibcc/TeamInformationForm'
import TeamMembersSection from '@/components/ibcc/TeamMembersSection'
import Button from '@/components/ui/Button'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useTeamRegistrationForm } from '@/hooks/useTeamRegistrationForm'

export default function TeamRegistrationPage() {
  usePageTitle('Team Leader Registration')
  const navigate = useNavigate()

  const {
    form,
    errors,
    participants,
    emptySlots,
    canAddMember,
    updateField,
    updateParticipant,
    addMember,
    removeMember,
    validate,
  } = useTeamRegistrationForm()

  const handleContinue = () => {
    if (!validate()) return
    // TODO: submit `form` + `participants` to the API
    navigate('/ibcc/register/confirm')
  }

  const handleSaveDraft = () => {
    // TODO: persist draft, e.g. localStorage or a draft endpoint
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#EDF4FF] via-[#F6FAFF] to-white">
      <RegistrationBackground />
      <RegistrationNavbar />

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-3 h-1.5 w-16 rounded-sm bg-[#F2B10E]" />
        <h1 className="text-3xl font-extrabold text-primary sm:text-4xl">
          Team Leader <span className="text-[#009CF1]">Registration</span>
        </h1>
        <p className="mt-3 text-sm text-[#667085]">
          Tell us about your team and invite your members to join the challenge.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <TeamInformationForm form={form} errors={errors} updateField={updateField} />
          <TeamMembersSection
            participants={participants}
            emptySlots={emptySlots}
            canAddMember={canAddMember}
            onChange={updateParticipant}
            onAdd={addMember}
            onRemove={removeMember}
          />
        </div>

        {/* Footer actions */}
        <footer className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[#E3EBF5] pt-6 sm:flex-row">
          <Button variant="link" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>

          <p className="flex max-w-[280px] items-center gap-2 text-[11px] leading-snug text-slate-400">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            Your registration data is securely stored and only used for event administration.
          </p>

          <div className="flex gap-3">
            <Button variant="outline" onClick={handleSaveDraft}>
              <Save className="h-4 w-4" /> Save Draft
            </Button>
            <Button onClick={handleContinue}>
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </footer>
      </main>
    </div>
  )
}
