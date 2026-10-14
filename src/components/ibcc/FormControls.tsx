import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type DragEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { Check, ChevronDown, Image as ImageIcon, UploadCloud } from 'lucide-react'

/* Design tokens */
type Size = 'md' | 'sm'

const PLACEHOLDER = 'text-[#A8B3C4]'
const base =
  'w-full rounded-md border bg-white outline-none transition-colors placeholder:text-[#A8B3C4]'
const sizeCls: Record<Size, string> = {
  md: 'h-10 px-3 text-[13px]',
  sm: 'h-9 px-2.5 text-xs',
}
const borderOk = 'border-[#D8E7F4]'
const focusCls = 'focus:border-[#009CF1] focus:ring-4 focus:ring-[#009CF1]/10'
const borderErr = 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'

export interface Option {
  value: string
  label: string
}

/* Label + error wrapper */
interface FieldShellProps {
  id: string
  label: string
  icon?: ReactNode
  required?: boolean
  error?: string
  size?: Size
  className?: string
  children: ReactNode
}

export function FieldShell({
  id,
  label,
  icon,
  required,
  error,
  size = 'md',
  className = '',
  children,
}: FieldShellProps) {
  const labelCls = size === 'md' ? 'mb-1.5 gap-1.5 text-[13px]' : 'mb-1 gap-1 text-[11px]'

  return (
    <div className={className}>
      <label htmlFor={id} className={`flex items-center font-normal text-slate-800 ${labelCls}`}>
        {icon && (
          <span className="text-slate-700 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:stroke-[1.5]">
            {icon}
          </span>
        )}
        <span>
          {label}
          {required && <span className="ml-0.5">*</span>}
        </span>
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

/* Text input */
interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'size'> {
  id: string
  label: string
  icon?: ReactNode
  error?: string
  size?: Size
  wrapperClassName?: string
}

export function TextField({
  id,
  label,
  icon,
  error,
  required,
  size = 'md',
  wrapperClassName,
  className = '',
  ...props
}: TextFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      icon={icon}
      required={required}
      error={error}
      size={size}
      className={wrapperClassName}
    >
      <input
        id={id}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${base} ${sizeCls[size]} text-slate-800 ${error ? borderErr : `${borderOk} ${focusCls}`} ${className}`}
        {...props}
      />
    </FieldShell>
  )
}

/* Dropdown */
interface DropdownProps {
  id: string
  value: string
  onChange: (value: string) => void
  options: Option[]
  placeholder?: string
  size?: Size
  invalid?: boolean
  describedBy?: string
  ariaLabel?: string
  bare?: boolean
  menuClassName?: string
}

export function Dropdown({
  id,
  value,
  onChange,
  options,
  placeholder = 'Select',
  size = 'md',
  invalid,
  describedBy,
  ariaLabel,
  bare,
  menuClassName = 'left-0 w-full',
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = `${id}-list`

  const selectedIndex = options.findIndex((o) => o.value === value)
  const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  useEffect(() => {
    if (open && active >= 0) {
      document.getElementById(`${id}-opt-${active}`)?.scrollIntoView({ block: 'nearest' })
    }
  }, [open, active, id])

  const openMenu = () => {
    setActive(selectedIndex >= 0 ? selectedIndex : 0)
    setOpen(true)
  }

  const choose = (v: string) => {
    onChange(v)
    setOpen(false)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (!open) openMenu()
        else setActive((i) => Math.min(i + 1, options.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        if (!open) openMenu()
        else setActive((i) => Math.max(i - 1, 0))
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (!open) openMenu()
        else if (active >= 0) choose(options[active].value)
        break
      case 'Escape':
        if (open) {
          e.preventDefault()
          setOpen(false)
        }
        break
      case 'Tab':
        setOpen(false)
        break
    }
  }

  const triggerCls = bare
    ? 'flex h-full items-center gap-1.5 pl-3 pr-1 text-[13px] outline-none'
    : `${base} ${sizeCls[size]} flex items-center justify-between gap-2 text-left ${
        invalid
          ? borderErr
          : open
            ? 'border-[#009CF1] ring-4 ring-[#009CF1]/10'
            : `${borderOk} ${focusCls}`
      }`

  return (
    <div ref={rootRef} className={`relative ${bare ? 'h-full' : ''}`}>
      <button
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={ariaLabel}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        aria-activedescendant={open && active >= 0 ? `${id}-opt-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDown}
        className={triggerCls}
      >
        <span className={`truncate ${selected ? 'text-slate-800' : PLACEHOLDER}`}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          className={`absolute top-full z-30 mt-1.5 max-h-56 min-w-[96px] overflow-auto rounded-lg border border-[#D8E7F4] bg-white p-1 shadow-[0_10px_30px_rgba(30,64,175,0.12)] ${menuClassName}`}
        >
          {options.map((o, i) => {
            const isSelected = o.value === value
            return (
              <li
                key={o.value}
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(o.value)}
                className={`flex cursor-pointer items-center justify-between gap-2 rounded-md px-2.5 py-2 ${
                  size === 'sm' ? 'text-xs' : 'text-[13px]'
                } ${i === active ? 'bg-[#EEF5FF]' : ''} ${
                  isSelected ? 'font-medium text-[#1D6FEA]' : 'text-slate-700'
                }`}
              >
                <span className="truncate">{o.label}</span>
                {isSelected && <Check className="h-3.5 w-3.5 shrink-0" />}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

/* Select field = label + Dropdown */
interface SelectFieldProps {
  id: string
  label: string
  icon?: ReactNode
  required?: boolean
  error?: string
  placeholder: string
  options: Option[]
  value: string
  onChange: (value: string) => void
  size?: Size
  wrapperClassName?: string
}

export function SelectField({
  id,
  label,
  icon,
  required,
  error,
  placeholder,
  options,
  value,
  onChange,
  size = 'md',
  wrapperClassName,
}: SelectFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      icon={icon}
      required={required}
      error={error}
      size={size}
      className={wrapperClassName}
    >
      <Dropdown
        id={id}
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        size={size}
        invalid={!!error}
        describedBy={error ? `${id}-error` : undefined}
      />
    </FieldShell>
  )
}

/* Phone number */
interface PhoneFieldProps {
  id: string
  label: string
  icon?: ReactNode
  required?: boolean
  error?: string
  countryCode: string
  countryCodes: string[]
  number: string
  onCountryCodeChange: (value: string) => void
  onNumberChange: (value: string) => void
  placeholder?: string
  wrapperClassName?: string
}

export function PhoneField({
  id,
  label,
  icon,
  required,
  error,
  countryCode,
  countryCodes,
  number,
  onCountryCodeChange,
  onNumberChange,
  placeholder = 'Enter number',
  wrapperClassName,
}: PhoneFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      icon={icon}
      required={required}
      error={error}
      className={wrapperClassName}
    >
      <div
        className={`flex h-10 items-center rounded-md border bg-white transition-colors focus-within:ring-4 ${
          error
            ? 'border-red-400 focus-within:border-red-500 focus-within:ring-red-500/10'
            : 'border-[#D8E7F4] focus-within:border-[#009CF1] focus-within:ring-[#009CF1]/10'
        }`}
      >
        <Dropdown
          id={`${id}-code`}
          bare
          ariaLabel="Country code"
          value={countryCode}
          onChange={onCountryCodeChange}
          options={countryCodes.map((c) => ({ value: c, label: c }))}
          menuClassName="-left-px w-28"
        />
        <span className="mx-2.5 h-5 w-px bg-[#D8E7F4]" aria-hidden />
        <input
          id={id}
          type="tel"
          inputMode="tel"
          required={required}
          value={number}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(e) => onNumberChange(e.target.value)}
          className="h-full min-w-0 flex-1 bg-transparent pr-3 text-[13px] text-slate-800 outline-none placeholder:text-[#A8B3C4]"
        />
      </div>
    </FieldShell>
  )
}

/* Upload: twibbon (utama) & logo (opsional) */
interface UploadProps {
  id: string
  file: File | null
  onChange: (file: File | null) => void
  error?: string
  accept?: string
  className?: string
}

const formatSize = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(2)} MB`

export function TwibbonUpload({
  id,
  file,
  onChange,
  error,
  accept = 'image/png,image/jpeg',
  className = '',
}: UploadProps) {
  const [dragging, setDragging] = useState(false)

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files?.[0]
    if (f) onChange(f)
  }

  return (
    <div className={className}>
      <p className="mb-1.5 text-[13px] font-semibold text-slate-900">Upload Twibbon *</p>
      <label
        htmlFor={id}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`flex h-[110px] cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-[1.5px] border-dashed px-4 text-center transition-colors focus-within:ring-4 focus-within:ring-[#009CF1]/10 ${
          error
            ? 'border-red-400 bg-white'
            : dragging
              ? 'border-[#009CF1] bg-[#EAF4FF]'
              : 'border-[#2D9CFF] bg-white hover:bg-[#F5FAFF]'
        }`}
      >
        <span className="mb-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#E4EFFD]">
          <UploadCloud className="h-4 w-4 text-[#2B7FE8]" />
        </span>
        <span className="max-w-full truncate text-xs font-semibold text-slate-900">
          {file ? file.name : 'Click to upload or drag and drop'}
        </span>
        <span className="text-[10px] text-slate-400">
          {file
            ? `${formatSize(file.size)} · click to replace`
            : 'PNG or JPG · max 5MB · square format'}
        </span>
        <input
          id={id}
          type="file"
          accept={accept}
          className="sr-only"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
      </label>
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

export function LogoUpload({
  id,
  file,
  onChange,
  accept = 'image/png,image/jpeg',
  className = '',
}: UploadProps) {
  const preview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file])
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  return (
    <div className={className}>
      <p className="mb-1.5 flex items-center gap-1.5 text-[13px] font-semibold text-slate-900">
        Team Logo
        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-500">
          Optional
        </span>
      </p>
      <label
        htmlFor={id}
        className="flex h-[110px] cursor-pointer flex-col items-center justify-center gap-1.5 overflow-hidden rounded-lg border border-dashed border-[#D5DEEA] bg-[#F4F7FB] text-center transition-colors hover:bg-[#EEF3F9] focus-within:ring-4 focus-within:ring-[#009CF1]/10"
      >
        {preview ? (
          <img src={preview} alt="Team logo preview" className="h-full w-full object-contain p-2" />
        ) : (
          <>
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#E8EDF5]">
              <ImageIcon className="h-4 w-4 text-slate-400" />
            </span>
            <span className="text-[10px] text-slate-400">Upload Logo</span>
          </>
        )}
        <input
          id={id}
          type="file"
          accept={accept}
          className="sr-only"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
      </label>
    </div>
  )
}
