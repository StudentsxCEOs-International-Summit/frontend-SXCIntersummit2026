import { useEffect, useState, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { X } from 'lucide-react'

export const card = 'rounded-2xl border border-[#E1EAF5] bg-white shadow-sm'

export function PageHeading({
  title,
  hint,
  actions,
}: {
  title: string
  hint?: string
  actions?: ReactNode
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-[#0b4fd1] sm:text-3xl">{title}</h1>
        {hint && <p className="mt-1 text-sm text-slate-500">{hint}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}

type Tone = 'blue' | 'green' | 'amber' | 'red' | 'slate'

const tones: Record<Tone, string> = {
  blue: 'bg-[#E8F0FE] text-[#0b4fd1]',
  green: 'bg-emerald-50 text-emerald-700',
  amber: 'bg-[#FFF3D1] text-[#B87400]',
  red: 'bg-red-50 text-red-600',
  slate: 'bg-slate-100 text-slate-600',
}

export function Badge({ tone = 'slate', children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${tones[tone]}`}>
      {children}
    </span>
  )
}

/** Colours a team status code the way the committee reads it. */
export function statusTone(code: string): Tone {
  if (['PAID', 'PASSED_PRELIMINARY', 'QUALIFIED_FINAL', 'QUALIFIED_SEMIFINAL'].includes(code)) return 'green'
  if (code.includes('REJECTED') || code.startsWith('FAILED') || code.startsWith('ELIMINATED')) return 'red'
  if (code === 'PENDING_PAYMENT') return 'amber'
  return 'blue'
}

type BtnKind = 'gold' | 'blue' | 'ghost' | 'danger' | 'success'

const btnKinds: Record<BtnKind, string> = {
  gold: 'bg-gold-gloss text-outline-sm border-2 border-white/90 shadow-[0_4px_16px_rgb(245_158_11/0.4)]',
  blue: 'bg-[#0262F4] text-white shadow-[0_2px_8px_rgba(2,98,244,0.35)] hover:bg-[#0b4fd1]',
  ghost: 'border border-[#D8E1EE] bg-white text-slate-700 hover:bg-[#F5F9FF]',
  danger: 'border border-red-200 bg-white text-red-600 hover:bg-red-50',
  success: 'bg-emerald-600 text-white hover:bg-emerald-700',
}

export function Btn({
  kind = 'blue',
  className = '',
  type = 'button',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { kind?: BtnKind }) {
  return (
    <button
      type={type}
      className={`font-heading inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-full px-4 text-sm font-bold transition focus-visible:ring-4 focus-visible:ring-[#0262F4]/25 focus-visible:outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${btnKinds[kind]} ${className}`}
      {...props}
    />
  )
}

export const inputClass =
  'h-10 w-full rounded-lg border border-[#D8E7F4] bg-white px-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0262F4] focus:ring-2 focus:ring-[#0262F4]/20 focus:outline-none'

export function Spinner({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex justify-center py-20" role="status">
      <span className="h-9 w-9 animate-spin rounded-full border-4 border-[#0262F4]/20 border-t-[#0262F4]" />
      <span className="sr-only">{label}</span>
    </div>
  )
}

export function ErrorBox({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div role="alert" className="rounded-2xl border border-red-200 bg-white p-6 text-center text-sm text-red-600">
      <p>{message}</p>
      {onRetry && (
        <Btn kind="ghost" className="mt-3" onClick={onRetry}>
          Try again
        </Btn>
      )}
    </div>
  )
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="px-5 py-12 text-center text-sm text-slate-500">{children}</p>
}

export function Notice({ kind, children }: { kind: 'error' | 'success'; children: ReactNode }) {
  const tone =
    kind === 'error'
      ? 'border-red-200 bg-red-50 text-red-600'
      : 'border-emerald-200 bg-emerald-50 text-emerald-700'
  return (
    <div role={kind === 'error' ? 'alert' : 'status'} className={`rounded-lg border px-4 py-3 text-sm ${tone}`}>
      {children}
    </div>
  )
}

/** Slide-over panel used for the team detail. */
export function Drawer({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-[90] flex justify-end bg-[#0a2a7a]/50 backdrop-blur-sm" onClick={onClose} role="presentation">
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-xl flex-col bg-[#F4F8FE] shadow-2xl"
      >
        <header className="flex items-center justify-between gap-3 border-b border-[#E1EAF5] bg-white px-5 py-4">
          <h2 className="font-heading truncate text-lg font-extrabold text-[#0b4fd1]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </aside>
    </div>
  )
}

export type Load<T> =
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'ready'; data: T }

/** Runs a loader on mount and whenever `reload` is called; keeps old data visible while refreshing. */
export function useLoad<T>(loader: () => Promise<T>) {
  const [state, setState] = useState<Load<T>>({ kind: 'loading' })
  const [key, setKey] = useState(0)

  useEffect(() => {
    let cancelled = false
    loader()
      .then((data) => !cancelled && setState({ kind: 'ready', data }))
      .catch((err: unknown) => {
        if (cancelled) return
        setState({ kind: 'error', message: err instanceof Error ? err.message : 'Could not load data.' })
      })
    return () => {
      cancelled = true
    }
    // The loader is a stable service call; only an explicit reload should refetch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return { state, reload: () => setKey((k) => k + 1) }
}

export const formatDate = (iso: string | null | undefined) =>
  iso
    ? new Date(iso).toLocaleString('en-GB', {
        timeZone: 'Asia/Jakarta',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '-'

export function downloadCsv(filename: string, rows: (string | number | null | undefined)[][]) {
  const escape = (cell: string | number | null | undefined) => `"${String(cell ?? '').replace(/"/g, '""')}"`
  const blob = new Blob(['﻿' + rows.map((r) => r.map(escape).join(',')).join('\r\n')], {
    type: 'text/csv;charset=utf-8',
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
