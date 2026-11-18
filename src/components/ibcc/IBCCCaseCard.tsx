import { ArrowUpRight, FileText } from 'lucide-react'
import { ibccMayapadaCaseUrl } from '@/data/landing'

export default function IBCCCaseCard({ className = '' }: { className?: string }) {
  return (
    <section
      aria-labelledby="ibcc-case-heading"
      className={`rounded-2xl border border-[#F4D58A] bg-[#FFF9E9] p-5 text-left sm:flex sm:items-center sm:gap-5 ${className}`}
    >
      <div className="flex-1">
        <h2 id="ibcc-case-heading" className="font-heading flex items-center gap-2 text-base font-extrabold text-[#805500]">
          <FileText className="h-5 w-5 shrink-0" aria-hidden="true" />
          Mayapada Healthcare Case Brief
        </h2>
        <p className="mt-1 text-sm leading-6 text-[#725D35]">
          Access the IBCC preliminary case brief. This link is for registered teams; please share it only
          with your teammates.
        </p>
      </div>
      <a
        href={ibccMayapadaCaseUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#0A60F5] px-5 text-sm font-bold text-white shadow-[0_6px_16px_rgba(10,96,245,0.25)] transition hover:bg-[#084FCB] focus-visible:ring-4 focus-visible:ring-[#0A60F5]/30 focus-visible:outline-none sm:mt-0"
      >
        Open Case Brief
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </section>
  )
}
