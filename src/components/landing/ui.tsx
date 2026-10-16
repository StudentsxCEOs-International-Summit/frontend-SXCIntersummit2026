import type { ReactNode } from 'react'
import diamonds from '@/assets/ic-diamonds.svg'
import wave from '@/assets/about/ic-wave.svg'
import type { ProgramCard as ProgramCardData } from '@/data/landing'

export function SectionTitle({ children, id, className }: { children: ReactNode; id?: string; className?: string }) {
  const isCustom = !!className && className !== "bg-glass-blue";
  
  const outerClass = isCustom 
    ? `${className} rounded-2xl p-[3px] shadow-[0_0_30px_rgba(2,98,244,0.6)] sm:min-w-[300px]`
    : `bg-glass-blue rounded-2xl border-2 border-white/90 shadow-[0_0_30px_rgba(2,98,244,0.6)] sm:min-w-[300px]`;
    
  const innerClass = isCustom
    ? "h-full w-full rounded-[calc(1rem-2px)] bg-glass-blue px-8 py-3 text-center"
    : "h-full w-full rounded-[calc(1rem-2px)] px-8 py-3 text-center";

  return (
    <div className="flex justify-center mb-10">
      <h2 id={id} className={outerClass}>
        <div className={innerClass}>
          <div className="relative inline-block">
          <span
            aria-hidden="true"
            className="absolute inset-0 px-2 text-xl md:text-2xl font-extrabold italic tracking-tight select-none pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(90deg, #003F9E 0%, #0262F4 65%, #FFFFFF 110%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              WebkitTextStroke: '6px transparent',
              paintOrder: 'stroke fill',
              filter: 'drop-shadow(0 0 8px rgba(2, 98, 244, 0.5)) drop-shadow(0 4px 8px rgba(0, 63, 158, 0.6))',
            }}
          >
            {children}
          </span>
          <span className="relative block px-2 text-xl md:text-2xl font-extrabold italic tracking-tight text-white">
            {children}
          </span>
        </div>
        </div>
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
      <div className="bg-glass-blue -mt-4 flex flex-1 flex-col gap-4 rounded-3xl border-[3px] border-white/90 px-6 pt-8 pb-6 shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-shadow duration-300 hover:shadow-[0_0_60px_rgba(255,255,255,0.6)]">
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
