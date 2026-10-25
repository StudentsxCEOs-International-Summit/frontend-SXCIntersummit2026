import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Download, Search } from 'lucide-react'
import { usePageTitle } from '@/hooks/usePageTitle'
import { adminService } from '@/services/admin'
import {
  Badge,
  Btn,
  Empty,
  ErrorBox,
  PageHeading,
  Spinner,
  card,
  downloadCsv,
  inputClass,
  useLoad,
} from '@/components/admin/ui'

export default function ParticipantsPage() {
  usePageTitle('Participants')
  const { state, reload } = useLoad(adminService.teams)
  const [query, setQuery] = useState('')
  const [role, setRole] = useState('ALL')

  const rows = useMemo(
    () =>
      state.kind === 'ready'
        ? state.data.flatMap((team) =>
            team.TeamMember.map((m) => ({
              key: `${team.id}-${m.user.id}`,
              teamId: team.id,
              team: team.name,
              code: team.code,
              role: m.role,
              name: m.user.name,
              email: m.user.email,
              whatsapp: m.user.wa_number,
              institution: m.institution ?? m.user.institution_name,
              year: m.yearOfStudy,
            })),
          )
        : [],
    [state],
  )

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return rows.filter(
      (r) =>
        (role === 'ALL' || r.role === role) &&
        (!q || [r.name, r.email, r.team, r.code, r.institution ?? ''].join(' ').toLowerCase().includes(q)),
    )
  }, [rows, query, role])

  const exportCsv = () =>
    downloadCsv('participants.csv', [
      ['Name', 'Email', 'WhatsApp', 'Role', 'Institution', 'Year of study', 'Team', 'Team code'],
      ...visible.map((r) => [r.name, r.email, r.whatsapp, r.role, r.institution, r.year, r.team, r.code]),
    ])

  return (
    <>
      <PageHeading
        title="Participants"
        hint={state.kind === 'ready' ? `${visible.length} of ${rows.length} people` : undefined}
        actions={
          <Btn kind="ghost" onClick={exportCsv} disabled={visible.length === 0}>
            <Download className="h-4 w-4" aria-hidden="true" /> Export CSV
          </Btn>
        }
      />

      <div className="mb-4 flex flex-wrap gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            type="search"
            aria-label="Search participants"
            placeholder="Search name, email, team or institution"
            className={`${inputClass} pl-9`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select aria-label="Filter by role" className={`${inputClass} w-auto`} value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="ALL">Leaders and members</option>
          <option value="LEADER">Leaders</option>
          <option value="MEMBER">Members</option>
        </select>
      </div>

      {state.kind === 'loading' && <Spinner />}
      {state.kind === 'error' && <ErrorBox message={state.message} onRetry={reload} />}

      {state.kind === 'ready' && (
        <div className={`${card} overflow-x-auto`}>
          {visible.length === 0 ? (
            <Empty>No participants match your search.</Empty>
          ) : (
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="border-b border-[#E8EEF6] bg-[#F7FAFD] text-xs tracking-wide text-slate-500 uppercase">
                <tr>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Contact</th>
                  <th className="px-4 py-3 font-semibold">Institution</th>
                  <th className="px-4 py-3 font-semibold">Role</th>
                  <th className="px-4 py-3 font-semibold">Team</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8EEF6]">
                {visible.map((r) => (
                  <tr key={r.key}>
                    <td className="px-4 py-3 font-semibold text-slate-900">{r.name}</td>
                    <td className="px-4 py-3">
                      <span className="block break-all text-slate-700">{r.email}</span>
                      <span className="text-xs text-slate-500">{r.whatsapp ?? '-'}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {r.institution ?? '-'}
                      {r.year && <span className="block text-xs text-slate-500">{r.year}</span>}
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone={r.role === 'LEADER' ? 'amber' : 'blue'}>{r.role === 'LEADER' ? 'Leader' : 'Member'}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Link to={`/admin/teams?team=${r.teamId}`} className="font-semibold text-[#0262F4] hover:underline">
                        {r.team}
                      </Link>
                      <span className="block text-xs text-slate-500">{r.code}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  )
}
