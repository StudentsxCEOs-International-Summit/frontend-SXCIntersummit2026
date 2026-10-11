import { Trash2 } from 'lucide-react'
import { Dropdown, FieldShell, TextField, type Option } from '@/components/ibcc/FormControls'
import type { TeamParticipant } from '@/types/teamRegistration'

interface TeamMemberCardProps {
  participant: TeamParticipant
  index: number
  isLeader: boolean
  roleOptions: Option[]
  onChange: (field: keyof TeamParticipant, value: string) => void
  onRemove?: () => void
}

export default function TeamMemberCard({
  participant,
  index,
  isLeader,
  roleOptions,
  onChange,
  onRemove,
}: TeamMemberCardProps) {
  const title = isLeader ? 'Team Leader' : `Member ${index}`
  const badge = isLeader ? 'TL' : `M${index}`
  const uid = `participant-${participant.id}`

  return (
    <div className="rounded-xl border border-[#DCE8F7] bg-[#F6F9FE] p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E3EEFF] text-[9px] font-bold text-[#2B6FDB]">
            {badge}
          </span>
          <h3 className="text-[13px] font-semibold text-ds-black">{title}</h3>
        </div>

        {isLeader ? (
          <span className="rounded-full border border-[#8DB8F5] bg-[#E3EEFF] px-2 py-0.5 text-[10px] font-semibold text-[#2B6FDB]">
            Required
          </span>
        ) : (
          onRemove && (
            <button
              type="button"
              onClick={onRemove}
              aria-label={`Remove ${title}`}
              className="rounded-md p-1 text-red-500 transition-colors hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_0.8fr]">
        <TextField
          id={`${uid}-name`}
          size="sm"
          label="Full Name"
          required
          wrapperClassName="min-w-0"
          placeholder={isLeader ? 'Your full name' : 'Member full name'}
          value={participant.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
        />
        <TextField
          id={`${uid}-email`}
          size="sm"
          type="email"
          label="Email Address"
          required
          wrapperClassName="min-w-0"
          placeholder={isLeader ? 'you@example.com' : 'name@example.com'}
          value={participant.email}
          onChange={(e) => onChange('email', e.target.value)}
        />
        <FieldShell id={`${uid}-role`} size="sm" label="Role / Position" className="min-w-0">
          <Dropdown
            id={`${uid}-role`}
            size="sm"
            value={participant.role}
            onChange={(v) => onChange('role', v)}
            options={roleOptions}
          />
        </FieldShell>
      </div>
    </div>
  )
}

export function EmptyMemberSlot({ number }: { number: number }) {
  return (
    <div className="rounded-xl border border-[#E6ECF4] bg-[#F7F9FC] p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E8EDF5] text-[9px] font-bold text-slate-400">
          M{number}
        </span>
        <h3 className="text-[13px] font-semibold text-slate-400">Member {number}</h3>
      </div>
      <div className="flex h-9 items-center justify-center rounded-lg border border-dashed border-[#D5DEEA] bg-ds-white text-xs text-slate-500">
        Slot available - click Add to fill this member
      </div>
    </div>
  )
}
