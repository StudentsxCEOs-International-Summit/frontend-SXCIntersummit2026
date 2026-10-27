import { useState } from 'react'
import { usePageTitle } from '@/hooks/usePageTitle'
import { contactService, type ContactMessage, type ContactStatus } from '@/services/contact'
import { ApiError } from '@/lib/api'
import {
  Badge,
  Btn,
  Empty,
  ErrorBox,
  Notice,
  PageHeading,
  Spinner,
  card,
  formatDate,
  useLoad,
} from '@/components/admin/ui'

const FILTERS: { key: ContactStatus | 'ALL'; label: string }[] = [
  { key: 'ALL', label: 'All' },
  { key: 'NEW', label: 'New' },
  { key: 'READ', label: 'Read' },
  { key: 'ARCHIVED', label: 'Archived' },
]

const statusTone = (status: ContactStatus) =>
  status === 'NEW' ? 'amber' : status === 'READ' ? 'green' : 'slate'

function MessageCard({
  message,
  busy,
  onStatus,
}: {
  message: ContactMessage
  busy: boolean
  onStatus: (status: ContactStatus) => void
}) {
  return (
    <li className={`${card} p-5`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-heading text-base font-bold text-slate-900">{message.name}</p>
          <p className="text-sm text-slate-600">
            {message.organization} ·{' '}
            <a href={`mailto:${message.email}`} className="font-medium break-all text-[#0262F4] hover:underline">
              {message.email}
            </a>
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Badge tone="blue">{message.type}</Badge>
          <Badge tone={statusTone(message.status)}>{message.status.charAt(0) + message.status.slice(1).toLowerCase()}</Badge>
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap text-slate-700">{message.message}</p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#E8EEF6] pt-3">
        <p className="text-xs text-slate-500">{formatDate(message.createdAt)} WIB</p>
        <div className="flex flex-wrap gap-2">
          {message.status !== 'READ' && (
            <Btn kind="success" disabled={busy} onClick={() => onStatus('READ')}>
              Mark read
            </Btn>
          )}
          {message.status !== 'NEW' && (
            <Btn kind="ghost" disabled={busy} onClick={() => onStatus('NEW')}>
              Mark new
            </Btn>
          )}
          {message.status !== 'ARCHIVED' && (
            <Btn kind="ghost" disabled={busy} onClick={() => onStatus('ARCHIVED')}>
              Archive
            </Btn>
          )}
        </div>
      </div>
    </li>
  )
}

export default function MessagesPage() {
  usePageTitle('Messages')
  const [filter, setFilter] = useState<ContactStatus | 'ALL'>('ALL')
  const { state, reload } = useLoad(() =>
    contactService.list({ status: filter === 'ALL' ? undefined : filter, pageSize: 100 }),
  )
  const [busyId, setBusyId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  // useLoad only reloads on demand, so changing the filter asks for a fresh list.
  const pick = (next: ContactStatus | 'ALL') => {
    setFilter(next)
    window.setTimeout(reload, 0)
  }

  const setStatus = async (message: ContactMessage, status: ContactStatus) => {
    setBusyId(message.id)
    setError(null)
    try {
      await contactService.setStatus(message.id, status)
      reload()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not update the message.')
    } finally {
      setBusyId(null)
    }
  }

  const counts = state.kind === 'ready' ? state.data.counts : {}
  const countFor = (key: ContactStatus | 'ALL') =>
    key === 'ALL' ? Object.values(counts).reduce((sum, n) => sum + (n ?? 0), 0) : (counts[key] ?? 0)

  return (
    <>
      <PageHeading
        title="Messages"
        hint="Partnership enquiries sent from the Contact page."
        actions={<Btn kind="ghost" onClick={reload}>Refresh</Btn>}
      />

      <div role="tablist" aria-label="Filter messages" className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map(({ key, label }) => {
          const selected = filter === key
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => pick(key)}
              className={`font-heading cursor-pointer rounded-full px-4 py-1.5 text-sm font-semibold transition focus-visible:ring-4 focus-visible:ring-[#0262F4]/25 focus-visible:outline-none ${
                selected ? 'bg-[#0262F4] text-white shadow' : 'border border-[#D8E1EE] bg-white text-slate-700 hover:bg-[#F5F9FF]'
              }`}
            >
              {label}
              {state.kind === 'ready' && <span className="ml-1.5 opacity-80">{countFor(key)}</span>}
            </button>
          )
        })}
      </div>

      {error && (
        <div className="mb-4">
          <Notice kind="error">{error}</Notice>
        </div>
      )}

      {state.kind === 'loading' && <Spinner />}
      {state.kind === 'error' && <ErrorBox message={state.message} onRetry={reload} />}
      {state.kind === 'ready' &&
        (state.data.items.length === 0 ? (
          <div className={card}>
            <Empty>No messages here yet.</Empty>
          </div>
        ) : (
          <ul className="grid gap-4">
            {state.data.items.map((message) => (
              <MessageCard
                key={message.id}
                message={message}
                busy={busyId === message.id}
                onStatus={(status) => void setStatus(message, status)}
              />
            ))}
          </ul>
        ))}
    </>
  )
}
