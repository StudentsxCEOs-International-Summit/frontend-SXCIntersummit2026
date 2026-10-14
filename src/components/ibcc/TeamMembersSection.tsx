import { Plus } from 'lucide-react'
import TeamMemberCard, { EmptyMemberSlot } from '@/components/ibcc/TeamMemberCard'
import SectionHeader from '@/components/ibcc/SectionHeader'
import Button from '@/components/ui/Button'
import { MAX_TOTAL_PARTICIPANTS, ROLE_OPTIONS } from '@/data/teamRegistration'
import type { TeamParticipant } from '@/types/teamRegistration'

import teamMembersIcon from '@/assets/ic-team-members.svg'

interface TeamMembersSectionProps {
  participants: TeamParticipant[]
  emptySlots: number
  canAddMember: boolean
  onChange: (index: number, field: keyof TeamParticipant, value: string) => void
  onAdd: () => void
  onRemove: (index: number) => void
}

export default function TeamMembersSection({
  participants,
  emptySlots,
  canAddMember,
  onChange,
  onAdd,
  onRemove,
}: TeamMembersSectionProps) {
  return (
    <section className="rounded-3xl border border-white bg-ds-white p-5 shadow-ds-lg sm:p-8">
      <SectionHeader
        icon={teamMembersIcon}
        title="Team members"
        description={`Add your leader and up to ${MAX_TOTAL_PARTICIPANTS - 1} members.`}
        badge={
          <span className="shrink-0 rounded-full bg-[#DCEBFF] px-3 py-1 text-[10px] font-semibold tracking-wide text-[#1D6FEA]">
            {participants.length} OF {MAX_TOTAL_PARTICIPANTS} ADDED
          </span>
        }
      />

      <div className="mt-5 space-y-3">
        {participants.map((p, i) => (
          <TeamMemberCard
            key={p.id}
            participant={p}
            index={i}
            isLeader={i === 0}
            roleOptions={ROLE_OPTIONS}
            onChange={(field, value) => onChange(i, field, value)}
            onRemove={i === 0 ? undefined : () => onRemove(i)}
          />
        ))}

        {emptySlots > 0 && <EmptyMemberSlot number={participants.length} />}
      </div>

      <Button variant="secondary" className="mt-4" onClick={onAdd} disabled={!canAddMember}>
        <Plus className="h-4 w-4" /> Add another member
      </Button>
    </section>
  )
}
