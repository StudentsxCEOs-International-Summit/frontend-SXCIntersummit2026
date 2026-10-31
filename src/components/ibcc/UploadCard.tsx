import { useId, useRef, useState, type ChangeEvent } from 'react'
import { CheckCircle2, UploadCloud } from 'lucide-react'
import { ApiError } from '@/lib/api'
import { ContactTeamText } from '@/components/ContactTeamText'

interface UploadCardProps {
  title: string
  description: string
  /** Lower-case extensions the backend accepts for this endpoint, e.g. ['pdf', 'pptx']. */
  extensions: string[]
  /** The backend's size limit for this endpoint. */
  maxMB: number
  buttonLabel: string
  /** Short highlight next to the title, e.g. the amount to pay. */
  badge?: string
  /** Sends the file; throw an ApiError to show its message. Resolve to mark it as sent. */
  onUpload: (file: File) => Promise<void>
}

const formatExtensions = (extensions: string[]) =>
  extensions.map((e) => e.toUpperCase()).join(', ')

/** One file picker + send button, with the same checks the backend will apply. */
export default function UploadCard({
  title,
  description,
  extensions,
  maxMB,
  buttonLabel,
  badge,
  onUpload,
}: UploadCardProps) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const picked = event.target.files?.[0] ?? null
    setError(null)
    setSent(false)

    if (!picked) {
      setFile(null)
      return
    }

    const extension = picked.name.split('.').pop()?.toLowerCase() ?? ''
    if (!extensions.includes(extension)) {
      setFile(null)
      setError(`Only ${formatExtensions(extensions)} files are accepted.`)
      event.target.value = ''
      return
    }
    if (picked.size > maxMB * 1024 * 1024) {
      setFile(null)
      setError(`File is too large. The maximum size is ${maxMB} MB.`)
      event.target.value = ''
      return
    }
    setFile(picked)
  }

  const handleUpload = async () => {
    if (!file) return
    setError(null)
    setUploading(true)
    try {
      await onUpload(file)
      setSent(true)
      setFile(null)
      if (inputRef.current) inputRef.current.value = ''
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="rounded-2xl border border-[#E1EAF5] bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-heading text-base font-bold text-slate-900">{title}</h3>
        {badge && (
          <span className="shrink-0 rounded-full bg-[#FFF3D1] px-3 py-0.5 text-sm font-bold whitespace-nowrap text-[#B87400]">
            {badge}
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-slate-500">{description}</p>

      <label
        htmlFor={inputId}
        className="mt-3 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-[#B9CCE6] bg-[#F7FAFD] px-4 py-3 text-sm text-slate-600 transition hover:bg-[#EEF4FC]"
      >
        <UploadCloud className="h-5 w-5 shrink-0 text-[#2874D8]" aria-hidden="true" />
        <span className="min-w-0 truncate">
          {file ? file.name : `Choose a file (${formatExtensions(extensions)}, max ${maxMB} MB)`}
        </span>
      </label>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={extensions.map((e) => `.${e}`).join(',')}
        className="sr-only"
        onChange={handleChange}
      />

      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          <ContactTeamText text={error} />
        </p>
      )}
      {sent && (
        <p role="status" className="mt-2 flex items-center gap-1.5 text-sm text-emerald-600">
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Sent successfully.
        </p>
      )}

      <button
        type="button"
        onClick={handleUpload}
        disabled={!file || uploading}
        className="mt-3 inline-flex h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-gradient-to-r from-[#0A60F5] to-[#0F7CFF] px-5 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(10,96,245,0.25)] transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {uploading ? 'Uploading…' : buttonLabel}
      </button>
    </div>
  )
}
