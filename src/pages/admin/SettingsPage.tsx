import { useEffect, useState, type FormEvent } from 'react'
import { usePageTitle } from '@/hooks/usePageTitle'
import { adminService, type ConfigUpdate } from '@/services/admin'
import { configService, type AppConfig } from '@/services/config'
import { ApiError } from '@/lib/api'
import { Badge, Btn, ErrorBox, Notice, PageHeading, Spinner, card, formatDate, inputClass, useLoad } from '@/components/admin/ui'

/** ISO instant -> the `YYYY-MM-DDTHH:mm` a datetime-local input expects, in Jakarta time. */
function toWibInput(iso: string) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date(iso))
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  return `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}`
}

/** A datetime-local value typed as Jakarta time -> ISO with the +07:00 offset the backend expects. */
const fromWibInput = (value: string) => `${value}:00+07:00`

function Row({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[240px_1fr] sm:items-center sm:gap-4">
      <div>
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        {hint && <p className="text-xs text-slate-500">{hint}</p>}
      </div>
      <div>{children}</div>
    </div>
  )
}

function SettingsForm({ config, onSaved }: { config: AppConfig; onSaved: () => void }) {
  const [extended, setExtended] = useState(config.extendedRegistration)
  // GET /config only reports the deadline that is in force, so that is the one we can prefill.
  const [standard, setStandard] = useState(config.extendedRegistration ? '' : toWibInput(config.deadline))
  const [extendedDeadline, setExtendedDeadline] = useState(config.extendedRegistration ? toWibInput(config.deadline) : '')
  const [slidePages, setSlidePages] = useState(String(config.maxSlidePages))
  const [slideSize, setSlideSize] = useState(String(config.maxSlideSizeMB))
  const [deadlineDays, setDeadlineDays] = useState(String(config.deadlineReminderDays ?? ''))
  const [paymentDays, setPaymentDays] = useState(String(config.paymentReminderDays ?? ''))
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<{ kind: 'error' | 'success'; text: string } | null>(null)

  useEffect(() => setMessage(null), [config])

  const save = async (event: FormEvent) => {
    event.preventDefault()
    const body: ConfigUpdate = { extendedRegistrationEnabled: extended }
    if (standard) body.registrationDeadline = fromWibInput(standard)
    if (extendedDeadline) body.registrationExtendedDeadline = fromWibInput(extendedDeadline)

    const numbers: [keyof ConfigUpdate, string][] = [
      ['maxSlidePages', slidePages],
      ['maxSlideSizeMB', slideSize],
      ['deadlineReminderDays', deadlineDays],
      ['paymentReminderDays', paymentDays],
    ]
    for (const [key, raw] of numbers) {
      if (raw.trim() === '') continue
      const value = Number(raw)
      if (!Number.isFinite(value) || value < 0) {
        setMessage({ kind: 'error', text: 'Numbers must be zero or higher.' })
        return
      }
      ;(body as Record<string, number>)[key] = value
    }

    const effective = extended ? extendedDeadline || standard : standard || extendedDeadline
    if (effective && !window.confirm(`Registration will ${extended ? 'run until the extended deadline' : 'close'} at ${effective.replace('T', ' ')} WIB. Save these settings?`)) return

    setBusy(true)
    setMessage(null)
    try {
      await adminService.updateConfig(body)
      setMessage({ kind: 'success', text: 'Settings saved and active now.' })
      onSaved()
    } catch (err) {
      setMessage({ kind: 'error', text: err instanceof ApiError ? err.message : 'Something went wrong.' })
    } finally {
      setBusy(false)
    }
  }

  const act = async (confirmText: string, action: () => Promise<unknown>, done: string) => {
    if (!window.confirm(confirmText)) return
    setBusy(true)
    setMessage(null)
    try {
      await action()
      setMessage({ kind: 'success', text: done })
      onSaved()
    } catch (err) {
      setMessage({ kind: 'error', text: err instanceof ApiError ? err.message : 'Something went wrong.' })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <form onSubmit={save} className={`${card} grid gap-5 p-5 sm:p-6`} noValidate>
        {message && <Notice kind={message.kind}>{message.text}</Notice>}

        <Row label="Standard deadline" hint="Jakarta time (WIB). Leave empty to keep the current one.">
          <input type="datetime-local" className={inputClass} value={standard} onChange={(e) => setStandard(e.target.value)} />
        </Row>
        <Row label="Extended registration" hint="Turn on to use the extended deadline instead.">
          <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" className="h-4 w-4 accent-[#0262F4]" checked={extended} onChange={(e) => setExtended(e.target.checked)} />
            Registration is extended
          </label>
        </Row>
        <Row label="Extended deadline" hint="Jakarta time (WIB).">
          <input type="datetime-local" className={inputClass} value={extendedDeadline} onChange={(e) => setExtendedDeadline(e.target.value)} />
        </Row>

        <hr className="border-[#E8EEF6]" />

        <Row label="Max slide pages">
          <input inputMode="numeric" className={inputClass} value={slidePages} onChange={(e) => setSlidePages(e.target.value)} />
        </Row>
        <Row label="Max slide size (MB)">
          <input inputMode="numeric" className={inputClass} value={slideSize} onChange={(e) => setSlideSize(e.target.value)} />
        </Row>
        <Row label="Deadline reminder (days before)">
          <input inputMode="numeric" className={inputClass} value={deadlineDays} onChange={(e) => setDeadlineDays(e.target.value)} />
        </Row>
        <Row label="Payment reminder (days after sign-up)">
          <input inputMode="numeric" className={inputClass} value={paymentDays} onChange={(e) => setPaymentDays(e.target.value)} />
        </Row>

        <div>
          <Btn kind="gold" type="submit" disabled={busy}>
            Save settings
          </Btn>
        </div>
      </form>

      <div className="grid h-fit gap-6">
        <section className={`${card} p-5`}>
          <h2 className="font-heading text-base font-extrabold text-slate-900">In force right now</h2>
          <div className="mt-3 flex items-center gap-2">
            <Badge tone={config.registrationOpen ? 'green' : 'red'}>{config.registrationOpen ? 'Registration open' : 'Registration closed'}</Badge>
            {config.extendedRegistration && <Badge tone="blue">Extended</Badge>}
          </div>
          <p className="mt-3 text-sm text-slate-600">Deadline: {formatDate(config.deadline)} WIB</p>
          <p className="mt-4 rounded-lg bg-[#FFF3D1] px-3 py-2 text-xs text-[#8a5a00]">
            These settings live in server memory. A server restart goes back to the values in the server environment, so
            update <code>REGISTRATION_DEADLINE</code> there as well for a lasting change.
          </p>
        </section>

        <section className={`${card} p-5`}>
          <h2 className="font-heading text-base font-extrabold text-slate-900">Maintenance</h2>
          <div className="mt-3 grid gap-2">
            <Btn
              kind="ghost"
              disabled={busy}
              onClick={() =>
                act(
                  'Send the deadline and payment reminder emails now?',
                  adminService.triggerEmails,
                  'Reminder emails were triggered.',
                )
              }
            >
              Send reminder emails now
            </Btn>
            <Btn
              kind="danger"
              disabled={busy}
              onClick={() =>
                act(
                  'Reload settings from the server environment? Changes made here since the last restart are discarded.',
                  adminService.reloadConfig,
                  'Settings reloaded from the server environment.',
                )
              }
            >
              Reload from server environment
            </Btn>
          </div>
        </section>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  usePageTitle('Settings')
  const config = useLoad(configService.get)

  return (
    <>
      <PageHeading title="Settings" hint="Registration deadline and submission limits." />
      {config.state.kind === 'loading' && <Spinner />}
      {config.state.kind === 'error' && <ErrorBox message={config.state.message} onRetry={config.reload} />}
      {config.state.kind === 'ready' && (
        <SettingsForm key={config.state.data.deadline + String(config.state.data.extendedRegistration)} config={config.state.data} onSaved={config.reload} />
      )}
    </>
  )
}
