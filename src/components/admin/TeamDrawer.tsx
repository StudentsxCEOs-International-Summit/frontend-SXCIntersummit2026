import { useState, type ReactNode } from 'react'
import { ExternalLink, Loader2 } from 'lucide-react'
import {
  adminService,
  fileLink,
  humanize,
  isPendingFile,
  paymentOf,
  preliminaryOf,
  semifinalOf,
  submissionLabel,
  type AdminPerson,
  type AdminTeam,
} from '@/services/admin'
import { ApiError } from '@/lib/api'
import { SEMIFINAL_FEE_TEXT, statusLabel } from '@/data/fees'
import { Badge, Btn, Drawer, Notice, card, formatDate, inputClass, statusTone } from './ui'

const waLink = (number: string) => `https://wa.me/${number.replace(/\D/g, '').replace(/^0/, '62')}`

function Person({ person, role, institution, year }: { person: AdminPerson; role: string; institution: string | null; year: string | null }) {
  return (
    <li className={`${card} p-4`}>
      <div className="flex items-start justify-between gap-2">
        <p className="font-heading font-bold text-slate-900">{person.name}</p>
        <Badge tone={role === 'LEADER' ? 'amber' : 'blue'}>{role === 'LEADER' ? 'Leader' : 'Member'}</Badge>
      </div>
      <dl className="mt-2 grid gap-1 text-sm text-slate-600">
        <div className="break-all">{person.email}</div>
        {institution && (
          <div>
            {institution}
            {year ? ` · ${year}` : ''}
          </div>
        )}
        {person.wa_number && (
          <a href={waLink(person.wa_number)} target="_blank" rel="noopener noreferrer" className="font-medium text-[#0262F4] hover:underline">
            WhatsApp {person.wa_number}
          </a>
        )}
      </dl>
    </li>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-6 first:mt-0">
      <h3 className="font-heading mb-2 text-sm font-extrabold tracking-wide text-slate-500 uppercase">{title}</h3>
      {children}
    </section>
  )
}

/** Runs one staff action, then asks the page to refresh the team list. */
function useAction(onDone: () => void) {
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<{ kind: 'error' | 'success'; text: string } | null>(null)

  const run = async (action: () => Promise<string | void>) => {
    setBusy(true)
    setMessage(null)
    try {
      const text = await action()
      setMessage({ kind: 'success', text: text || 'Saved.' })
      onDone()
    } catch (err) {
      setMessage({ kind: 'error', text: err instanceof ApiError ? err.message : 'Something went wrong.' })
    } finally {
      setBusy(false)
    }
  }
  return { busy, message, run }
}

export default function TeamDrawer({
  team,
  onClose,
  onChanged,
}: {
  team: AdminTeam | null
  onClose: () => void
  onChanged: () => void
}) {
  const { busy, message, run } = useAction(onChanged)
  const [notes, setNotes] = useState('')
  const [score, setScore] = useState('')
  const [feedback, setFeedback] = useState('')

  if (!team) return null

  const payment = paymentOf(team)
  const preliminary = preliminaryOf(team)
  const semifinal = semifinalOf(team)
  const paymentDone = ['PAID', 'REJECTED_PAYMENT'].includes(team.statuscode.code)

  const verify = (status: 'approved' | 'rejected') => {
    const verb = status === 'approved' ? 'Approve' : 'Reject'
    const extra = status === 'approved' ? ' An access code email will be sent to the leader.' : ' The leader will be emailed.'
    if (!window.confirm(`${verb} the payment of ${team.name}?${extra}`)) return
    void run(async () => {
      await adminService.verifyPayment({ teamId: team.id, status, notes: notes.trim() || undefined })
      setNotes('')
      return `Payment ${status}.`
    })
  }

  const evaluate = (status: 'passed' | 'failed') => {
    const numeric = score.trim() === '' ? undefined : Number(score)
    if (numeric !== undefined && (Number.isNaN(numeric) || numeric < 0 || numeric > 100)) {
      void run(async () => {
        throw new ApiError('Score must be between 0 and 100.', 400)
      })
      return
    }
    if (!window.confirm(`Mark the preliminary round of ${team.name} as ${status}?`)) return
    void run(async () => {
      await adminService.evaluatePreliminary(team.id, {
        status,
        score: numeric,
        feedback: feedback.trim() || undefined,
      })
      return `Preliminary marked ${status}.`
    })
  }

  const generateCode = () => {
    if (!window.confirm(`Generate a new access code for ${team.name}? Older codes stop working.`)) return
    void run(async () => {
      const result = await adminService.generateAccessCode(team.id)
      return `New access code: ${result.accessCode} (valid until ${formatDate(result.expiresAt)}).`
    })
  }

  return (
    <Drawer open title={team.name} onClose={onClose}>
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="blue">Code {team.code}</Badge>
        <Badge tone={statusTone(team.statuscode.code)}>{statusLabel(team.statuscode.code)}</Badge>
        {team.score !== null && <Badge tone="slate">Score {team.score}</Badge>}
      </div>
      <p className="mt-2 text-xs text-slate-500">
        Registered {formatDate(team.createdAt)} WIB
        {team.memberComposition ? ` · ${humanize(team.memberComposition)}` : ''}
        {team.sourceInfo ? ` · Heard via ${humanize(team.sourceInfo)}` : ''}
      </p>

      {message && (
        <div className="mt-4">
          <Notice kind={message.kind}>{message.text}</Notice>
        </div>
      )}

      <Section title="People">
        <ul className="grid gap-3">
          {team.TeamMember.map((m) => (
            <Person key={m.user.id} person={m.user} role={m.role} institution={m.institution} year={m.yearOfStudy} />
          ))}
        </ul>
      </Section>

      <Section title="Submitted files">
        {team.submissionTeam.length === 0 ? (
          <p className="text-sm text-slate-500">Nothing uploaded yet.</p>
        ) : (
          <ul className={`${card} divide-y divide-[#E8EEF6]`}>
            {team.submissionTeam.map((s) => {
              const file = s.Files[0]
              const link = file ? fileLink(file) : null
              return (
                <li key={s.id} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                  <span className="min-w-0">
                    <span className="block truncate font-semibold text-slate-900">{submissionLabel(s)}</span>
                    <span className="block text-xs text-slate-500">{formatDate(s.submittedAt)}</span>
                  </span>
                  {file && isPendingFile(file) ? (
                    <Badge tone="amber">Processing</Badge>
                  ) : link ? (
                    <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-[#0262F4] hover:underline">
                      Open <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : (
                    <Badge tone="slate">No link</Badge>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </Section>

      <Section title={`Semifinal payment (${SEMIFINAL_FEE_TEXT})`}>
        {!payment ? (
          <p className="text-sm text-slate-500">No payment proof yet. Payment only starts once the team passes the preliminary.</p>
        ) : (
          <div className={`${card} p-4`}>
            <p className="text-sm text-slate-600">
              Proof uploaded {formatDate(payment.submittedAt)}.{' '}
              {paymentDone ? `Decision: ${statusLabel(team.statuscode.code)}.` : 'Waiting for a decision.'}
            </p>
            <label htmlFor="pay-notes" className="mt-3 block text-sm font-semibold text-slate-700">
              Note for the leader <span className="font-normal text-slate-400">(shown when rejecting)</span>
            </label>
            <input id="pay-notes" className={`${inputClass} mt-1`} value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={200} />
            <div className="mt-3 flex flex-wrap gap-2">
              <Btn kind="success" disabled={busy} onClick={() => verify('approved')}>
                Approve payment
              </Btn>
              <Btn kind="danger" disabled={busy} onClick={() => verify('rejected')}>
                Reject
              </Btn>
            </div>
          </div>
        )}
      </Section>

      <Section title="Preliminary round">
        {!preliminary ? (
          <p className="text-sm text-slate-500">No preliminary deck submitted yet.</p>
        ) : (
          <div className={`${card} p-4`}>
            <div className="grid gap-3 sm:grid-cols-[120px_1fr]">
              <div>
                <label htmlFor="pre-score" className="block text-sm font-semibold text-slate-700">Score</label>
                <input id="pre-score" inputMode="decimal" placeholder="0-100" className={`${inputClass} mt-1`} value={score} onChange={(e) => setScore(e.target.value)} />
              </div>
              <div>
                <label htmlFor="pre-feedback" className="block text-sm font-semibold text-slate-700">Feedback</label>
                <input id="pre-feedback" className={`${inputClass} mt-1`} value={feedback} onChange={(e) => setFeedback(e.target.value)} />
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Btn kind="success" disabled={busy} onClick={() => evaluate('passed')}>
                Mark passed
              </Btn>
              <Btn kind="danger" disabled={busy} onClick={() => evaluate('failed')}>
                Mark failed
              </Btn>
            </div>
          </div>
        )}
      </Section>

      <Section title="Semifinal access">
        <div className={`${card} p-4`}>
          <p className="text-sm text-slate-600">
            {semifinal ? `Semifinal deck uploaded ${formatDate(semifinal.submittedAt)}.` : 'No semifinal deck yet.'}
          </p>
          <Btn kind="ghost" className="mt-3" disabled={busy} onClick={generateCode}>
            Generate access code
          </Btn>
        </div>
      </Section>

      {busy && (
        <p className="mt-4 flex items-center gap-2 text-sm text-slate-500" role="status">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Working…
        </p>
      )}
    </Drawer>
  )
}
