import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import logo from '@/assets/ic-icon-internasional.svg'
import { ContactTeamText } from '@/components/ContactTeamText'
import building from '@/assets/ic-buildingus.webp'
import diamonds from '@/assets/ic-diamonds.svg'
import starGlow from '@/assets/ic-star-glow.svg'

interface AuthCardProps {
  title: string
  subtitle?: ReactNode
  children: ReactNode
  footer?: ReactNode
}

/** Centered card shell shared by the small auth steps (OTP, forgot/reset password, invitation). */
export default function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="bg-landing relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 font-body">
      <img
        src={building}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full scale-115 origin-center object-cover select-none [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
      />
      <img src={diamonds} alt="" aria-hidden="true" className="animate-sway pointer-events-none absolute -top-4 -left-16 w-44 rotate-225 select-none sm:-left-20 sm:w-72" />
      <img src={diamonds} alt="" aria-hidden="true" className="animate-sway-slow pointer-events-none absolute -right-14 bottom-[12%] w-40 rotate-45 select-none sm:w-64" />
      <img src={starGlow} alt="" aria-hidden="true" className="animate-twinkle pointer-events-none absolute -bottom-8 -left-10 w-40 -rotate-12 select-none sm:w-60" />
      <div className="relative w-full max-w-md rounded-3xl border-2 border-white bg-white p-7 shadow-[0_0_28px_rgba(255,255,255,0.5)] sm:p-9">
        <Link to="/" className="mx-auto block w-fit" aria-label="Back to home">
          <img src={logo} alt="StudentsxCEOs International Summit" className="h-12 w-auto" />
        </Link>
        <h1 className="font-heading mt-5 text-center text-2xl font-extrabold text-brand-blue-700">
          {title}
        </h1>
        {subtitle && (
          <p className="text-brand-blue-muted mt-1.5 text-center text-sm">{subtitle}</p>
        )}
        <div className="mt-6">{children}</div>
        {footer && <div className="mt-6 text-center text-sm text-slate-500">{footer}</div>}
      </div>
    </div>
  )
}

export function Alert({ kind, children }: { kind: 'error' | 'success'; children: ReactNode }) {
  const tone =
    kind === 'error'
      ? 'border-red-200 bg-red-50 text-red-600'
      : 'border-emerald-200 bg-emerald-50 text-emerald-700'
  return (
    <div role={kind === 'error' ? 'alert' : 'status'} className={`rounded-lg border px-4 py-3 text-sm ${tone}`}>
      {typeof children === 'string' ? <ContactTeamText text={children} /> : children}
    </div>
  )
}

export function SubmitButton({
  loading,
  children,
  disabled,
}: {
  loading: boolean
  children: ReactNode
  disabled?: boolean
}) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className="bg-gold-gloss text-outline-sm font-heading inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-white/90 px-6 text-sm font-bold shadow-[0_4px_16px_rgb(245_158_11/0.45)] transition-transform duration-200 hover:scale-[1.02] focus-visible:ring-4 focus-visible:ring-[#f4a300]/40 focus-visible:outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? 'Please wait…' : children}
    </button>
  )
}
