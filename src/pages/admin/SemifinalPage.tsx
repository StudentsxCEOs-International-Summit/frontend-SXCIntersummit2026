import { useState, type FormEvent } from 'react'
import { usePageTitle } from '@/hooks/usePageTitle'
import { adminService } from '@/services/admin'
import { ApiError } from '@/lib/api'
import { Badge, Btn, Empty, ErrorBox, Notice, PageHeading, Spinner, card, inputClass, useLoad } from '@/components/admin/ui'

export default function SemifinalPage() {
  usePageTitle('Semifinal')
  const scores = useLoad(adminService.scores)
  const teams = useLoad(adminService.teams)
  const [teamId, setTeamId] = useState('')
  const [score, setScore] = useState('')
  const [comment, setComment] = useState('')
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<{ kind: 'error' | 'success'; text: string } | null>(null)

  const act = async (action: () => Promise<string>) => {
    setBusy(true)
    setMessage(null)
    try {
      setMessage({ kind: 'success', text: await action() })
      scores.reload()
    } catch (err) {
      setMessage({ kind: 'error', text: err instanceof ApiError ? err.message : 'Something went wrong.' })
    } finally {
      setBusy(false)
    }
  }

  const submitScore = (event: FormEvent) => {
    event.preventDefault()
    const value = Number(score)
    if (!teamId || score.trim() === '' || Number.isNaN(value) || value < 0 || value > 100) {
      setMessage({ kind: 'error', text: 'Choose a team and enter a score between 0 and 100.' })
      return
    }
    void act(async () => {
      await adminService.submitScore({ teamId: Number(teamId), score: value, comment: comment.trim() || undefined })
      setScore('')
      setComment('')
      return 'Score saved. Submitting again for the same team updates your score.'
    })
  }

  const publish = () => {
    if (selected.size === 0) return
    const ranked = scores.state.kind === 'ready' ? scores.state.data.rankings.length : 0
    const rest = ranked - selected.size
    if (
      !window.confirm(
        `Publish results? ${selected.size} team(s) qualify and ${rest} scored team(s) are eliminated. Every scored team is emailed and this cannot be undone.`,
      )
    )
      return
    void act(async () => {
      const result = await adminService.publishResults([...selected])
      setSelected(new Set())
      return `Published: ${result.qualified.length} qualified, ${result.eliminated.length} eliminated. Emails are being sent.`
    })
  }

  const toggle = (id: number) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const teamList = teams.state.kind === 'ready' ? teams.state.data : []

  return (
    <>
      <PageHeading title="Semifinal" hint="Score teams, then publish who advances to the final." />

      {message && (
        <div className="mb-4">
          <Notice kind={message.kind}>{message.text}</Notice>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <form onSubmit={submitScore} className={`${card} h-fit p-5`} noValidate>
          <h2 className="font-heading text-base font-extrabold text-slate-900">Add my score</h2>
          <p className="mt-1 text-xs text-slate-500">You are recorded as the judge.</p>

          <label htmlFor="sf-team" className="mt-4 block text-sm font-semibold text-slate-700">Team</label>
          <select id="sf-team" className={`${inputClass} mt-1`} value={teamId} onChange={(e) => setTeamId(e.target.value)}>
            <option value="">Choose a team</option>
            {teamList.map((t) => (
              <option key={t.id} value={t.id}>
                {t.code} · {t.name}
              </option>
            ))}
          </select>

          <label htmlFor="sf-score" className="mt-3 block text-sm font-semibold text-slate-700">Score (0-100)</label>
          <input id="sf-score" inputMode="decimal" className={`${inputClass} mt-1`} value={score} onChange={(e) => setScore(e.target.value)} />

          <label htmlFor="sf-comment" className="mt-3 block text-sm font-semibold text-slate-700">Comment</label>
          <textarea
            id="sf-comment"
            rows={3}
            maxLength={500}
            className="mt-1 w-full rounded-lg border border-[#D8E7F4] bg-white px-3 py-2 text-sm focus:border-[#0262F4] focus:ring-2 focus:ring-[#0262F4]/20 focus:outline-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <Btn kind="gold" type="submit" className="mt-4 w-full" disabled={busy}>
            Save score
          </Btn>
        </form>

        <section className={`${card} overflow-hidden`}>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8EEF6] px-5 py-4">
            <h2 className="font-heading text-base font-extrabold text-slate-900">Ranking</h2>
            <Btn kind="success" disabled={busy || selected.size === 0} onClick={publish}>
              Publish results ({selected.size} qualify)
            </Btn>
          </div>

          {scores.state.kind === 'loading' && <Spinner />}
          {scores.state.kind === 'error' && <ErrorBox message={scores.state.message} onRetry={scores.reload} />}
          {scores.state.kind === 'ready' &&
            (scores.state.data.rankings.length === 0 ? (
              <Empty>No scores yet. Scores appear here as judges submit them.</Empty>
            ) : (
              <ol className="divide-y divide-[#E8EEF6]">
                {scores.state.data.rankings.map((team, index) => (
                  <li key={team.teamId} className="flex items-start gap-3 px-5 py-3">
                    <input
                      type="checkbox"
                      className="mt-1.5 h-4 w-4 accent-[#0262F4]"
                      aria-label={`Qualify ${team.teamName}`}
                      checked={selected.has(team.teamId)}
                      onChange={() => toggle(team.teamId)}
                    />
                    <span className="font-heading w-6 pt-0.5 text-sm font-extrabold text-slate-400">{index + 1}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate font-semibold text-slate-900">{team.teamName}</p>
                        <Badge tone="blue">Avg {team.average}</Badge>
                      </div>
                      <ul className="mt-1 grid gap-0.5 text-xs text-slate-500">
                        {team.scores.map((s) => (
                          <li key={s.judgeId}>
                            {s.judgeName}: <span className="font-semibold text-slate-700">{s.score}</span>
                            {s.comment ? ` · ${s.comment}` : ''}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ol>
            ))}
        </section>
      </div>
    </>
  )
}
