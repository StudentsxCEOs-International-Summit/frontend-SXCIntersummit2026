import { MessageCircle } from 'lucide-react'
import { ibccWhatsappGroupUrl } from '@/data/landing'

/**
 * Asks the team to make sure every member has joined the IBCC Preliminary WhatsApp group, where the case,
 * announcements and Q&A are shared. Shown after team registration and on My Team.
 */
export function JoinWhatsappGroupCard({ link, className = '' }: { link?: string | null; className?: string }) {
  const href = link || ibccWhatsappGroupUrl

  return (
    <div
      className={`rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-left sm:flex sm:items-center sm:gap-5 ${className}`}
    >
      <div className="flex-1">
        <p className="font-heading text-base font-extrabold text-emerald-800">
          Make sure your whole team has joined the WhatsApp group
        </p>
        <p className="mt-1 text-sm leading-6 text-emerald-900/80">
          The preliminary case, announcements and Q&amp;A for IBCC 2026 are shared in the Preliminary WhatsApp
          group. Every member of your team needs to join, so please share this link with your teammates too.
        </p>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(5,150,105,0.25)] hover:bg-emerald-700 sm:mt-0"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        Join WhatsApp Group
      </a>
    </div>
  )
}

export default JoinWhatsappGroupCard
