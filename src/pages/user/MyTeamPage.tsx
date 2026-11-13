import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Circle } from 'lucide-react'
import { ContactTeamText } from '@/components/ContactTeamText'
import { usePageTitle } from '@/hooks/usePageTitle'
import { ApiError } from '@/lib/api'
import { ibccService, type MyTeam, type TeamMemberInfo } from '@/services/ibcc'
import Footer from '@/components/landing/Footer'
import UploadCard from '@/components/ibcc/UploadCard'
import { SEMIFINAL_FEE_TEXT, statusLabel } from '@/data/fees'

type Load =
  | { kind: 'loading' }
  | { kind: 'empty' }
  | { kind: 'error'; message: string }
  | { kind: 'ready'; team: MyTeam }

/**
 * Payment and the semifinal deck only open for teams that passed the preliminary. An older
 * backend does not send `semifinal`, so fall back to the qualified flag it always had.
 */
const semifinalOpen = (team: MyTeam) => team.semifinal?.eligible ?? team.selectionResult.isQualified

const STAGE_LABEL: Record<MyTeam['competitionStage'], string> = {
  REGISTRATION: 'Registration',
  PREELIM: 'Preliminary',
  SEMIFINAL: 'Semifinal',
}

function PersonCard({
  name,
  email,
  institution,
  major,
  yearOfStudy,
  role,
}: {
  name: string
  email: string
  institution: string | null
  major?: string | null
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
      {(institution || major || yearOfStudy) && (
        <p className="mt-2 text-sm text-slate-600">
          {[institution, major, yearOfStudy].filter(Boolean).join(' · ')}
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

const PROCESSING_POLL_MS = 6000
const DECK_EXTENSIONS = ['pdf', 'ppt', 'pptx']
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif']

function InfoCard({ title, children }: { title: string; children: string }) {
  return (
    <div className="rounded-2xl border border-[#E1EAF5] bg-white p-4 shadow-sm">
      <h3 className="font-heading text-base font-bold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{children}</p>
    </div>
  )
}

/**
 * The upload endpoints (POST /ibcc/submission/*) only check that the caller leads a team, so the
 * page decides which uploads make sense from the data GET /ibcc/my-team returns.
 */
function SubmissionCards({ team, onUploaded }: { team: MyTeam; onUploaded: () => void }) {
  const cards: ReactNode[] = []

  const eligible = semifinalOpen(team)

  // The preliminary round is free, so there is no payment card before the semifinal.
  const paymentStatus = team.payment.status
  if (eligible && (paymentStatus === 'NOT_SUBMITTED' || paymentStatus === 'REJECTED')) {
    cards.push(
      <UploadCard
        key="payment"
        title="Semifinal payment"
        badge={SEMIFINAL_FEE_TEXT}
        description={
          paymentStatus === 'REJECTED'
            ? `Your last payment proof was rejected. Please transfer ${SEMIFINAL_FEE_TEXT} and upload a new, clear proof of payment.`
            : `The semifinal fee is ${SEMIFINAL_FEE_TEXT}. Transfer it, then upload a screenshot or photo of the proof.`
        }
        extensions={IMAGE_EXTENSIONS}
        maxMB={5}
        buttonLabel="Send payment proof"
        onUpload={async (file) => {
          await ibccService.submitPayment(file, team.id)
          onUploaded()
        }}
      />,
    )
  } else if (eligible && paymentStatus === 'PENDING_VERIFICATION') {
    cards.push(
      <InfoCard key="payment" title="Semifinal payment">
        {team.payment.isProcessing
          ? 'Received. Your proof is being processed, then the committee will verify it.'
          : 'Received. The committee is verifying your payment.'}
      </InfoCard>,
    )
  }

  if (!team.submissions.preliminaryOutputSubmitted) {
    cards.push(
      <UploadCard
        key="preliminary"
        title="Preliminary slide deck"
        description="Upload your preliminary round deck as a PDF or PowerPoint file."
        extensions={DECK_EXTENSIONS}
        maxMB={20}
        buttonLabel="Send slide deck"
        onUpload={async (file) => {
          await ibccService.submitPreliminary(file, team.id)
          onUploaded()
        }}
      />,
    )
  }

  if (eligible && !team.semifinal?.submitted) {
    cards.push(
      <UploadCard
        key="semifinal"
        title="Semifinal slide deck"
        description="Your team advanced to the semifinal. Upload your semifinal deck as a PDF or PowerPoint file."
        extensions={DECK_EXTENSIONS}
        maxMB={20}
        buttonLabel="Send semifinal deck"
        onUpload={async (file) => {
          await ibccService.submitSemifinal(file, team.id)
          onUploaded()
        }}
      />,
    )
  }

  if (cards.length === 0) {
    return (
      <p className="rounded-2xl bg-white/95 px-5 py-4 text-sm text-slate-600">
        Nothing to upload right now.
      </p>
    )
  }

  return <div className="grid gap-4 md:grid-cols-2">{cards}</div>
}

export default function MyTeamPage() {
  usePageTitle('My Team')
  const [state, setState] = useState<Load>({ kind: 'loading' })
  // Bumped after an upload so the page re-reads GET /ibcc/my-team without flashing a spinner.
  const [reloadKey, setReloadKey] = useState(0)
  const reload = () => setReloadKey((key) => key + 1)

  const filesProcessing = state.kind === 'ready' && Boolean(state.team.submissions.filesProcessing)

  // While files are still being copied to Drive, quietly re-read the team until they finish.
  useEffect(() => {
    if (!filesProcessing) return
    const timer = window.setTimeout(reload, PROCESSING_POLL_MS)
    return () => window.clearTimeout(timer)
  }, [filesProcessing, reloadKey])

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
  }, [reloadKey])

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
            <ContactTeamText text={state.message} />
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
                  {statusLabel(state.team.status)}
                </span>
              </div>
            </header>

            {filesProcessing && (
              <p
                role="status"
                className="mx-auto mt-6 flex max-w-2xl items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 text-center text-sm font-medium text-[#0b4fd1]"
              >
                <span
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-[#0b4fd1]/30 border-t-[#0b4fd1]"
                />
                Your files were received and are being processed. This page updates by itself, and your
                submission time is already recorded.
              </p>
            )}

            {state.team.preliminaryResult === 'PASSED' && (
              <p className="mx-auto mt-6 max-w-2xl rounded-2xl bg-emerald-50 px-5 py-4 text-center text-sm font-medium text-emerald-700">
                Congratulations, your team passed the preliminary round! Next, pay the semifinal fee of{' '}
                {SEMIFINAL_FEE_TEXT} and upload your semifinal deck below.
              </p>
            )}
            {state.team.preliminaryResult === 'FAILED' && (
              <p className="mx-auto mt-6 max-w-2xl rounded-2xl bg-white px-5 py-4 text-center text-sm font-medium text-slate-700">
                Thank you for taking part in the preliminary round. Sadly, your team did not advance to the
                semifinal this time.
              </p>
            )}

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
                    major={state.team.leader.major}
                    role="Leader"
                  />
                  {state.team.members.map((m: TeamMemberInfo) => (
                    <PersonCard
                      key={m.id}
                      name={m.name}
                      email={m.email}
                      institution={m.institution}
                      major={m.major}
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
                    <Step done={state.team.submissions.requirementsCompleted && !filesProcessing}>
                      {filesProcessing ? 'Registration files (processing)' : 'Registration requirements'}
                    </Step>
                    <Step done={state.team.submissions.preliminaryOutputSubmitted}>
                      Preliminary slide deck
                    </Step>
                    {semifinalOpen(state.team) && (
                      <>
                        <Step done={state.team.payment.status === 'PAID'}>
                          {state.team.payment.status === 'PAID'
                            ? 'Semifinal payment verified'
                            : state.team.payment.status === 'PENDING_VERIFICATION'
                              ? 'Semifinal payment submitted (awaiting verification)'
                              : state.team.payment.status === 'REJECTED'
                                ? 'Semifinal payment rejected'
                                : `Semifinal payment (${SEMIFINAL_FEE_TEXT})`}
                        </Step>
                        <Step done={Boolean(state.team.semifinal?.submitted)}>Semifinal slide deck</Step>
                      </>
                    )}
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

            <section className="mt-10" aria-labelledby="submissions-heading">
              <h2 id="submissions-heading" className="font-heading mb-3 text-lg font-extrabold text-white">
                Submissions
              </h2>
              {!state.team.isLeader ? (
                <p className="rounded-2xl bg-white/95 px-5 py-4 text-sm text-slate-600">
                  Only the team leader can upload files for the team.
                </p>
              ) : (
                <>
                  {!semifinalOpen(state.team) && (
                    <p className="mb-3 text-sm text-white/90">
                      The preliminary round is free. Payment ({SEMIFINAL_FEE_TEXT}) only opens if your team
                      advances to the semifinal.
                    </p>
                  )}
                  <SubmissionCards team={state.team} onUploaded={reload} />
                </>
              )}
            </section>
          </>
        )}
      </section>
      <Footer />
    </div>
  )
}
