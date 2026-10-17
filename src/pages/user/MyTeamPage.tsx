import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Circle } from 'lucide-react'
import { usePageTitle } from '@/hooks/usePageTitle'
import { ApiError } from '@/lib/api'
import { ibccService, type MyTeam, type TeamMemberInfo } from '@/services/ibcc'
import Footer from '@/components/landing/Footer'

type Load =
  | { kind: 'loading' }
  | { kind: 'empty' }
  | { kind: 'error'; message: string }
  | { kind: 'ready'; team: MyTeam }

const humanize = (value: string) =>
  value
    .toLowerCase()
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

const STAGE_LABEL: Record<MyTeam['competitionStage'], string> = {
  REGISTRATION: 'Registration',
  PREELIM: 'Preliminary',
  SEMIFINAL: 'Semifinal',
}

function PersonCard({
  name,
  email,
  institution,
  yearOfStudy,
  role,
}: {
  name: string
  email: string
  institution: string | null
  yearOfStudy?: string | null
  role: 'Leader' | 'Member'
}) {
  return (
    <li className="rounded-2xl border border-[#E1EAF5] bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-heading truncate text-base font-bold text-slate-900">{name}</p>
          <p className="truncate text-sm text-slate-500">{email}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-0.5 text-xs font-semibold ${
            role === 'Leader' ? 'bg-[#FFF3D1] text-[#B87400]' : 'bg-[#E7F0FF] text-[#1748be]'
          }`}
        >
          {role}
        </span>
      </div>
      {(institution || yearOfStudy) && (
        <p className="mt-2 text-sm text-slate-600">
          {[institution, yearOfStudy].filter(Boolean).join(' · ')}
        </p>
      )}
    </li>
  )
}

function Step({ done, children }: { done: boolean; children: string }) {
  return (
    <li className="flex items-center gap-2 text-sm text-slate-700">
      {done ? (
        <CheckCircle2 className="h-5 w-5 text-emerald-500" aria-hidden="true" />
      ) : (
        <Circle className="h-5 w-5 text-slate-300" aria-hidden="true" />
      )}
      <span className={done ? '' : 'text-slate-500'}>{children}</span>
    </li>
  )
}

export default function MyTeamPage() {
  usePageTitle('My Team')
  const [state, setState] = useState<Load>({ kind: 'loading' })

  useEffect(() => {
    let cancelled = false
    ibccService
      .getMyTeam()
      .then((team) => {
        if (!cancelled) setState({ kind: 'ready', team })
      })
      .catch((err) => {
        if (cancelled) return
        if (err instanceof ApiError && err.status === 404) setState({ kind: 'empty' })
        else
          setState({
            kind: 'error',
            message: err instanceof ApiError ? err.message : 'Could not load your team.',
          })
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="bg-landing relative overflow-hidden">
      <section className="mx-auto w-full max-w-[1000px] px-4 pt-32 pb-20 sm:px-6 sm:pt-40">
        {state.kind === 'loading' && (
          <div className="flex justify-center py-24" role="status">
            <span className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
            <span className="sr-only">Loading…</span>
          </div>
        )}

        {state.kind === 'error' && (
          <div role="alert" className="rounded-2xl border border-red-200 bg-white p-6 text-center text-red-600">
            {state.message}
          </div>
        )}

        {state.kind === 'empty' && (
          <div className="rounded-3xl bg-white p-8 text-center shadow-[0_0_24px_rgba(255,255,255,0.35)]">
            <h1 className="font-heading text-2xl font-extrabold text-[#0b4fd1]">No Team Yet</h1>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
              You haven&apos;t registered a team for IBCC 2026. Gather your teammates and sign up!
            </p>
            <Link
              to="/team-register"
              className="bg-gold-gloss text-outline-sm font-heading mt-6 inline-flex rounded-full border-2 border-white/90 px-8 py-2.5 text-sm font-bold shadow-[0_4px_16px_rgb(245_158_11/0.45)]"
            >
              Register Your Team
            </Link>
          </div>
        )}

        {state.kind === 'ready' && (
          <>
            <header className="text-center">
              <p className="font-heading text-sm font-semibold tracking-wide text-white/90">
                IBCC 2026 · {STAGE_LABEL[state.team.competitionStage]}
              </p>
              <h1
                className="font-heading mt-1 text-4xl font-extrabold text-white italic md:text-5xl"
                style={{ textShadow: '0 3px 0 #003F9E, 0 0 22px rgba(2, 98, 244, 0.7)' }}
              >
                {state.team.name}
              </h1>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <span className="rounded-full bg-white px-4 py-1 text-sm font-bold text-[#0b4fd1]">
                  Team code: {state.team.code}
                </span>
                <span className="rounded-full bg-[#FFF3D1] px-4 py-1 text-sm font-semibold text-[#B87400]">
                  {humanize(state.team.status)}
                </span>
              </div>
            </header>

            {state.team.selectionResult.isAnnounced && state.team.selectionResult.announcementMessage && (
              <p
                className={`mx-auto mt-6 max-w-2xl rounded-2xl px-5 py-4 text-center text-sm font-medium ${
                  state.team.selectionResult.isQualified
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-white text-slate-700'
                }`}
              >
                {state.team.selectionResult.announcementMessage}
              </p>
            )}

            <div className="mt-10 grid gap-6 md:grid-cols-[1.6fr_1fr]">
              <div>
                <h2 className="font-heading mb-3 text-lg font-extrabold text-white">Participants</h2>
                <ul className="grid gap-3">
                  <PersonCard
                    name={state.team.leader.name}
                    email={state.team.leader.email}
                    institution={state.team.leader.institution}
                    role="Leader"
                  />
                  {state.team.members.map((m: TeamMemberInfo) => (
                    <PersonCard
                      key={m.id}
                      name={m.name}
                      email={m.email}
                      institution={m.institution}
                      yearOfStudy={m.yearOfStudy}
                      role="Member"
                    />
                  ))}
                </ul>
              </div>

              <aside>
                <h2 className="font-heading mb-3 text-lg font-extrabold text-white">Progress</h2>
                <div className="rounded-2xl border border-[#E1EAF5] bg-white p-4 shadow-sm">
                  <ul className="grid gap-3">
                    <Step done={state.team.submissions.requirementsCompleted}>
                      Registration requirements
                    </Step>
                    <Step done={state.team.payment.status === 'PAID'}>
                      {state.team.payment.status === 'PAID'
                        ? 'Payment verified'
                        : state.team.payment.status === 'PENDING_VERIFICATION'
                          ? 'Payment proof submitted (awaiting verification)'
                          : state.team.payment.status === 'REJECTED'
                            ? 'Payment proof rejected'
                            : 'Payment proof not submitted'}
                    </Step>
                    <Step done={state.team.submissions.preliminaryOutputSubmitted}>
                      Preliminary slide deck
                    </Step>
                  </ul>
                  {state.team.submissions.preliminarySubmittedAt && (
                    <p className="mt-3 border-t border-[#E8EEF6] pt-3 text-xs text-slate-500">
                      Submitted{' '}
                      {new Date(state.team.submissions.preliminarySubmittedAt).toLocaleString()}
                    </p>
                  )}
                </div>
              </aside>
            </div>
          </>
        )}
      </section>
      <Footer />
    </div>
  )
}
