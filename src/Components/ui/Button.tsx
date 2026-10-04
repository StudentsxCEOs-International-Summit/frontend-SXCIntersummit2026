import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'outline' | 'secondary' | 'link'

const BASE =
  'inline-flex items-center justify-center gap-2 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50'

const VARIANTS: Record<Variant, string> = {
  primary:
    'h-11 rounded-lg bg-gradient-to-r from-[#0A60F5] to-[#0F7CFF] px-6 text-sm text-white shadow-[0_6px_16px_rgba(10,96,245,0.25)] hover:opacity-95',
  outline:
    'h-11 rounded-lg border border-[#D8E1EE] bg-ds-white px-5 text-sm text-ds-black hover:bg-slate-50',
  secondary:
    'h-10 w-full rounded-lg border border-[#D8E1EE] bg-ds-white text-[13px] text-[#1D6FEA] hover:bg-[#F5F9FF]',
  link: 'text-sm text-slate-600 hover:text-ds-black',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

export default function Button({
  variant = 'primary',
  type = 'button',
  className = '',
  ...props
}: ButtonProps) {
  return <button type={type} className={`${BASE} ${VARIANTS[variant]} ${className}`} {...props} />
}
