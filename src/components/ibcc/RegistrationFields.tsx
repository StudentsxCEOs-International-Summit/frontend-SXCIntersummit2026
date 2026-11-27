import { type ChangeEvent, type ReactNode } from 'react'
import { CheckCircle2, FileUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { registrationLinks } from '@/utils/registrationLinks'

type RegistrationLinkKey = keyof typeof registrationLinks

export const REGISTRATION_INPUT_CLASS =
  'h-11 w-full rounded-lg border border-[#D8E7F4] bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-[#A8B3C4] focus:border-[#009CF1] focus:ring-4 focus:ring-[#009CF1]/10'

export function RegistrationLink({
  linkKey,
  children,
}: {
  linkKey: RegistrationLinkKey
  children: ReactNode
}) {
  const link = registrationLinks[linkKey]

  return (
    <Link
      to={link.url}
      target={link.target}
      rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
      className="font-medium text-[#1D6FEA] underline decoration-[#A7C7F5] underline-offset-2 hover:text-[#124EA8]"
    >
      {children}
    </Link>
  )
}

export function FormField({
  id,
  label,
  required = true,
  error,
  children,
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-800">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export function ChoiceCard({
  name,
  value,
  label,
  type = 'radio',
  checked,
  onChange,
}: {
  name: string
  value: string
  label: string
  type?: 'radio' | 'checkbox'
  checked: boolean
  onChange: (value: string, checked: boolean) => void
}) {
  return (
    <label
      className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition ${
        checked
          ? 'border-[#2D83F5] bg-[#F0F6FF] text-[#174EA6]'
          : 'border-[#D8E7F4] bg-white text-slate-700 hover:border-[#9FC4F5]'
      }`}
    >
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={(event) => onChange(value, event.target.checked)}
        className="h-4 w-4 accent-[#1D6FEA]"
      />
      <span>{label}</span>
    </label>
  )
}

export function FileUploadField({
  id,
  file,
  error,
  onChange,
}: {
  id: string
  file: File | null
  error?: string
  onChange: (file: File | null) => void
}) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.files?.[0] ?? null)
  }

  return (
    <div>
      <label
        htmlFor={id}
        className={`flex min-h-20 cursor-pointer items-center gap-3 rounded-lg border border-dashed px-4 py-3 transition ${
          error
            ? 'border-red-400 bg-red-50/40'
            : file
              ? 'border-emerald-400 bg-emerald-50/60 hover:bg-emerald-50'
              : 'border-[#7BADEB] bg-white hover:bg-[#F5FAFF]'
        }`}
      >
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
            file ? 'bg-emerald-100 text-emerald-600' : 'bg-[#EAF3FF] text-[#2874D8]'
          }`}
        >
          {file ? (
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          ) : (
            <FileUp className="h-5 w-5" aria-hidden="true" />
          )}
        </span>
        <span className="min-w-0">
          {file ? (
            <>
              <span className="block truncate text-sm font-semibold text-slate-800">{file.name}</span>
              <span className="mt-0.5 block text-xs text-emerald-700">Selected - click to replace</span>
            </>
          ) : (
            <>
              <span className="block text-sm font-semibold text-slate-800">
                One file per requirement (Max 10 MB)
              </span>
              <span className="mt-0.5 block text-xs text-slate-500">Not selected yet</span>
            </>
          )}
        </span>
        <input
          id={id}
          type="file"
          accept=".jpg,.jpeg,.pdf,image/jpeg,application/pdf"
          className="sr-only"
          onChange={handleChange}
        />
      </label>
      {error && (
        <p className="mt-1.5 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
