import { Link } from 'react-router-dom'
import { usePageTitle } from '@/hooks/usePageTitle'
import { adminService, humanize, isPendingFile, paymentOf, preliminaryOf, type AdminTeam } from '@/services/admin'
import { configService } from '@/services/config'
import { Badge, ErrorBox, PageHeading, Spinner, card, formatDate, statusTone, useLoad } from '@/components/admin/ui'

function Stat({ label, value, hint, tone = 'text-[#0b4fd1]' }: { label: string; value: number | string; hint?: string; tone?: string }) {
  return (
    <div className={`${card} p-5`}>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className={`font-heading mt-1 text-3xl font-extrabold ${tone}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  )
}

const awaitingPayment = (team: AdminTeam) =>
  Boolean(paymentOf(team)) && !['PAID', 'REJECTED_PAYMENT'].includes(team.statuscode.code)

export default function OverviewPage() {
  usePageTitle('Admin Overview')
  const teams = useLoad(adminService.teams)
  const config = useLoad(configService.get)

  if (teams.state.kind === 'loading') return <Spinner />
  if (teams.state.kind === 'error') return <ErrorBox message={teams.state.message} onRetry={teams.reload} />

  const list = teams.state.data
  const people = new Set(list.flatMap((t) => t.TeamMember.map((m) => m.user.id)))
  const processing = list
    .flatMap((t) => t.submissionTeam.flatMap((s) => s.Files))
    .filter(isPendingFile).length
  const waiting = list.filter(awaitingPayment)
  const byStatus = Object.entries(
    list.reduce<Record<string, number>>((acc, t) => {
      acc[t.statuscode.code] = (acc[t.statuscode.code] ?? 0) + 1
      return acc
    }, {}),
  ).sort((a, b) => b[1] - a[1])

  const cfg = config.state.kind === 'ready' ? config.state.data : null

  return (
    <>
      <PageHeading title="Overview" hint="A quick read on registrations and what needs the committee." />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Key numbers">
        <Stat label="Registered teams" value={list.length} />
        <Stat label="Participants" value={people.size} hint="Leaders and members" />
        <Stat label="Payments to verify" value={waiting.length} tone={waiting.length ? 'text-[#B87400]' : 'text-emerald-600'} />
        <Stat label="Files still processing" value={processing} hint="Waiting for the Drive upload" tone={processing ? 'text-[#B87400]' : 'text-emerald-600'} />
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className={`${card} overflow-hidden`}>
          <h2 className="font-heading border-b border-[#E8EEF6] px-5 py-4 text-base font-extrabold text-slate-900">
            Waiting for payment verification
          </h2>
          {waiting.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-slate-500">Nothing is waiting. All uploaded payments are handled.</p>
          ) : (
            <ul className="divide-y divide-[#E8EEF6]">
              {waiting.slice(0, 8).map((team) => (
                <li key={team.id}>
                  <Link
                    to={`/admin/teams?team=${team.id}`}
                    className="flex items-center justify-between gap-3 px-5 py-3 text-sm transition hover:bg-[#F5F9FF]"
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-semibold text-slate-900">{team.name}</span>
                      <span className="block truncate text-xs text-slate-500">
                        {team.code} · uploaded {formatDate(paymentOf(team)?.submittedAt)}
                      </span>
                    </span>
                    <Badge tone="amber">Review</Badge>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <div className="grid content-start gap-6">
          <section className={`${card} p-5`}>
            <h2 className="font-heading text-base font-extrabold text-slate-900">Registration</h2>
            {cfg ? (
              <>
                <div className="mt-3 flex items-center gap-2">
                  <Badge tone={cfg.registrationOpen ? 'green' : 'red'}>{cfg.registrationOpen ? 'Open' : 'Closed'}</Badge>
                  {cfg.extendedRegistration && <Badge tone="blue">Extended</Badge>}
                </div>
                <p className="mt-3 text-sm text-slate-600">Deadline: {formatDate(cfg.deadline)} WIB</p>
                <Link to="/admin/settings" className="mt-3 inline-block text-sm font-semibold text-[#0262F4] hover:underline">
                  Change deadline
                </Link>
              </>
            ) : (
              <p className="mt-3 text-sm text-slate-500">Loading…</p>
            )}
          </section>

          <section className={`${card} p-5`}>
            <h2 className="font-heading text-base font-extrabold text-slate-900">Teams by status</h2>
            {byStatus.length === 0 ? (
              <p className="mt-3 text-sm text-slate-500">No teams yet.</p>
            ) : (
              <ul className="mt-3 grid gap-2">
                {byStatus.map(([code, count]) => (
                  <li key={code} className="flex items-center justify-between text-sm">
                    <Badge tone={statusTone(code)}>{humanize(code)}</Badge>
                    <span className="font-semibold text-slate-700">{count}</span>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-4 border-t border-[#E8EEF6] pt-3 text-xs text-slate-500">
              {list.filter((t) => preliminaryOf(t)).length} teams submitted the preliminary deck.
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
