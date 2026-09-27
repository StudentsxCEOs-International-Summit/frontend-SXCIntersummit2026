import type { ReactNode } from 'react'
import diamonds from '@/assets/ic-diamonds.svg'
import wave from '@/assets/ic-wave.svg'
import type { ProgramCard as ProgramCardData } from '@/data/landing'

export function SectionTitle({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <div className="flex justify-center">
      <h2
        id={id}
        className="bg-glass-blue text-outline-blue rounded-2xl border-2 border-white/90 px-10 py-2 text-center text-2xl font-extrabold italic shadow-[0_8px_24px_rgb(10_63_184/0.45)] sm:min-w-[380px] sm:text-[2rem]"
      >
        {children}
      </h2>
    </div>
  )
}

export function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {diagonal ? <path d="M7 17 17 7M8 7h9v9" /> : <path d="M5 12h14M13 6l6 6-6 6" />}
    </svg>
  )
}

interface GoldButtonProps {
  href: string
  children: ReactNode
  className?: string
}

export function GoldButton({ href, children, className = '' }: GoldButtonProps) {
  return (
    <a
      href={href}
      className={`bg-gold-gloss text-outline-sm inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/90 px-8 py-2.5 font-heading text-body-base font-bold shadow-[0_4px_16px_rgb(245_158_11/0.45)] transition-transform duration-200 hover:scale-[1.03] focus-visible:ring-4 focus-visible:ring-white/60 focus-visible:outline-none active:scale-95 ${className}`}
    >
      {children}
    </a>
  )
}

/** Orange tab label that sits on top of a card, as in the mockup. */
export function CardTab({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`bg-gradient-to-b from-[#f8ba48] to-[#f4a300] rounded-t-2xl rounded-br-2xl border-2 border-white/90 px-5 py-2.5 text-center font-body text-lg font-medium text-white shadow-[0_4px_12px_rgb(244_163_0/0.4)] sm:text-xl ${className}`}
    >
      {children}
    </div>
  )
}

/** Stand-in thumbnail built from the design's diamond + wave motifs. */
export function ProgramThumbnail({ title }: { title: string }) {
  return (
    <div className="relative flex aspect-[295/170] items-center justify-center overflow-hidden rounded-sm bg-[linear-gradient(135deg,#0a4fe0_0%,#2a7cf7_55%,#8fd0ff_100%)]">
      <img src={wave} alt="" className="absolute -left-10 top-4 w-[180%] max-w-none opacity-70" />
      <img
        src={diamonds}
        alt=""
        className="absolute -right-8 -top-8 w-28 rotate-12 opacity-95"
        aria-hidden="true"
      />
      <img
        src={diamonds}
        alt=""
        className="absolute -bottom-10 -left-6 w-28 -rotate-12 opacity-95"
        aria-hidden="true"
      />
      <p className="text-outline-blue relative px-3 text-center font-heading text-xl leading-tight font-extrabold italic sm:text-2xl">
        {title}
      </p>
    </div>
  )
}

export function ProgramCard({ card }: { card: ProgramCardData }) {
  return (
    <article className="flex h-full flex-col">
      <CardTab className="relative z-10 mx-4">{card.tab}</CardTab>
      <div className="bg-glass-blue -mt-4 flex flex-1 flex-col gap-4 rounded-3xl border-[3px] border-white/90 px-6 pt-8 pb-6 shadow-[0_10px_30px_rgb(10_63_184/0.35)]">
        <ProgramThumbnail title={card.title} />
        <div className="flex-1">
          <p className="line-clamp-3 text-justify font-body text-sm text-white">
            {card.description}
          </p>
        </div>
        <GoldButton href={card.href} className="w-full">
          Read More <ArrowIcon />
        </GoldButton>
      </div>
    </article>
  )
}
