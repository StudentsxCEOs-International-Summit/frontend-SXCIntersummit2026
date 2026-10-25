import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Download, Search } from 'lucide-react'
import { usePageTitle } from '@/hooks/usePageTitle'
import { adminService, humanize, isPendingFile, paymentOf } from '@/services/admin'
import TeamDrawer from '@/components/admin/TeamDrawer'
import {
  Badge,
  Btn,
  Empty,
  ErrorBox,
  PageHeading,
  Spinner,
  card,
  downloadCsv,
  formatDate,
  inputClass,
  statusTone,
  useLoad,
} from '@/components/admin/ui'

export default function TeamsPage() {
  usePageTitle('Registrations')
  const { state, reload } = useLoad(adminService.teams)
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('ALL')

  const teams = state.kind === 'ready' ? state.data : []
  const statuses = useMemo(() => [...new Set(teams.map((t) => t.statuscode.code))].sort(), [teams])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return teams.filter((t) => {
      if (status !== 'ALL' && t.statuscode.code !== status) return false
      if (!q) return true
      return [t.name, t.code, t.leader.name, t.leader.email, t.leader.institution_name ?? '']
        .join(' ')
        .toLowerCase()
        .includes(q)
    })
  }, [teams, query, status])

  const openId = Number(params.get('team')) || null
  const open = teams.find((t) => t.id === openId) ?? null

  const exportCsv = () =>
    downloadCsv('registrations.csv', [
      ['Code', 'Team', 'Status', 'Leader', 'Email', 'WhatsApp', 'Institution', 'Members', 'Registered at'],
      ...visible.map((t) => [
        t.code,
        t.name,
        humanize(t.statuscode.code),
        t.leader.name,
        t.leader.email,
        t.leader.wa_number,
        t.leader.institution_name,
        t.TeamMember.length,
        formatDate(t.createdAt),
      ]),
    ])

  return (
    <>
      <PageHeading
        title="Registrations"
        hint={state.kind === 'ready' ? `${visible.length} of ${teams.length} teams` : undefined}
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
            aria-label="Search teams"
            placeholder="Search team, code, leader, email or institution"
            className={`${inputClass} pl-9`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select aria-label="Filter by status" className={`${inputClass} w-auto`} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="ALL">All statuses</option>
          {statuses.map((code) => (
            <option key={code} value={code}>
              {humanize(code)}
            </option>
          ))}
        </select>
      </div>

      {state.kind === 'loading' && <Spinner />}
      {state.kind === 'error' && <ErrorBox message={state.message} onRetry={reload} />}

      {state.kind === 'ready' && (
        <div className={`${card} overflow-x-auto`}>
          {visible.length === 0 ? (
            <Empty>No teams match your filters.</Empty>
          ) : (
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-[#E8EEF6] bg-[#F7FAFD] text-xs tracking-wide text-slate-500 uppercase">
                <tr>
                  <th className="px-4 py-3 font-semibold">Team</th>
                  <th className="px-4 py-3 font-semibold">Leader</th>
                  <th className="px-4 py-3 font-semibold">People</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Payment</th>
                  <th className="px-4 py-3 font-semibold">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8EEF6]">
                {visible.map((t) => {
                  const files = t.submissionTeam.flatMap((s) => s.Files)
                  const processing = files.filter(isPendingFile).length
                  return (
                    <tr
                      key={t.id}
                      tabIndex={0}
                      onClick={() => setParams({ team: String(t.id) })}
                      onKeyDown={(e) => e.key === 'Enter' && setParams({ team: String(t.id) })}
                      className="cursor-pointer transition hover:bg-[#F5F9FF] focus-visible:bg-[#F5F9FF] focus-visible:outline-none"
                    >
                      <td className="px-4 py-3">
                        <span className="block font-semibold text-slate-900">{t.name}</span>
                        <span className="text-xs text-slate-500">
                          {t.code}
                          {processing > 0 && ` · ${processing} file(s) processing`}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="block text-slate-800">{t.leader.name}</span>
                        <span className="text-xs text-slate-500">{t.leader.institution_name ?? '-'}</span>
                      </td>
                      <td className="px-4 py-3 text-slate-700">{t.TeamMember.length}</td>
                      <td className="px-4 py-3">
                        <Badge tone={statusTone(t.statuscode.code)}>{humanize(t.statuscode.code)}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        {paymentOf(t) ? <Badge tone="blue">Proof uploaded</Badge> : <Badge>None</Badge>}
                      </td>
                      <td className="px-4 py-3 text-xs whitespace-nowrap text-slate-500">{formatDate(t.createdAt)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      )}

      <TeamDrawer team={open} onClose={() => setParams({})} onChanged={reload} />
    </>
  )
}
