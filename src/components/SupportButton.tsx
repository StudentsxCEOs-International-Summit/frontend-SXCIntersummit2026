import { MessageCircle } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { supportContact } from '@/data/landing'

/**
 * Always-visible "Need help?" button that opens a WhatsApp chat with IT support. Problems do not always
 * show up as an error message (a mail that never arrives, a page that looks wrong), so the way to reach
 * us should not only appear inside error messages. Hidden on the committee's admin pages.
 */
export function SupportButton() {
  const { pathname } = useLocation()
  if (pathname.startsWith('/admin')) return null

  return (
    <a
      href={supportContact.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Need help? Contact IT support on WhatsApp"
      className="fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-full border border-[#D8E1EE] bg-white px-4 py-3 text-sm font-semibold text-[#0A60F5] shadow-[0_8px_24px_rgba(15,23,42,0.25)] transition hover:bg-[#F1F6FF] focus-visible:ring-4 focus-visible:ring-[#0A60F5]/30 focus-visible:outline-none sm:right-6 sm:bottom-6"
    >
      <MessageCircle className="h-5 w-5 text-emerald-600" aria-hidden="true" />
      <span>
        Need help? <span className="hidden sm:inline">Contact IT Support</span>
      </span>
    </a>
  )
}

export default SupportButton
