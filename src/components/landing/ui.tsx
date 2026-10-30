import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import diamonds from '@/assets/ic-diamonds.svg'
import wave from '@/assets/about/ic-wave.svg'
import type { ProgramCard as ProgramCardData } from '@/data/landing'

export function SectionTitle({ children, id, className }: { children: ReactNode; id?: string; className?: string }) {
  const isCustom = !!className && className !== "bg-glass-blue";
  
  const outerClass = isCustom 
    ? `${className} rounded-2xl p-[3px] shadow-[0_0_24px_rgba(2,98,244,0.6)] sm:min-w-[240px]`
    : `bg-glass-blue rounded-2xl border-2 border-white/90 shadow-[0_0_24px_rgba(2,98,244,0.6)] sm:min-w-[240px]`;

  const innerClass = isCustom
    ? "h-full w-full rounded-[calc(1rem-2px)] bg-glass-blue px-6 py-2 text-center"
    : "h-full w-full rounded-[calc(1rem-2px)] px-6 py-2 text-center";

  return (
    <div className="flex justify-center mb-6">
      <h2 id={id} className={outerClass}>
        <div className={innerClass}>
          <span
            className="block px-2 text-base md:text-xl font-extrabold italic tracking-tight text-white"
            style={{ textShadow: '0 2px 0 #003F9E, 0 0 10px rgba(0, 63, 158, 0.7)' }}
          >
            {children}
          </span>
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
  const classes = `bg-gold-gloss text-outline-sm inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/90 px-8 py-2.5 font-heading text-body-base font-bold shadow-[0_4px_16px_rgb(245_158_11/0.45)] transition-transform duration-200 hover:scale-[1.03] focus-visible:ring-4 focus-visible:ring-white/60 focus-visible:outline-none active:scale-95 ${className}`

  const isExternal = href.startsWith('http://') || href.startsWith('https://')

  // In-app paths go through the router (no full reload, so the session isn't re-fetched);
  // anchors like "#about" and external URLs stay plain links.
  if (href.startsWith('/')) {
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <a
      href={href}
      className={classes}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

/** Small dialog that lets the visitor pick one of several links (e.g. BPC or BCC masterclass). */
export function ChoiceDialog({
  title,
  subtitle = 'Which masterclass do you want to see?',
  choices,
  onClose,
}: {
  title: string
  subtitle?: string
  choices: { label: string; href: string }[]
  onClose: () => void
}) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="bg-glass-blue w-full max-w-sm rounded-3xl border-[3px] border-white/90 p-6 text-center shadow-[0_0_40px_rgba(255,255,255,0.4)]"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-heading text-lg font-extrabold text-white italic">{title}</p>
        <p className="mt-1 text-sm text-white/90">{subtitle}</p>
        <div className="mt-5 flex flex-col gap-3">
          {choices.map((choice) => (
            <GoldButton key={choice.href} href={choice.href} className="w-full py-2!">
              {choice.label} <ArrowIcon />
            </GoldButton>
          ))}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 cursor-pointer text-sm font-semibold text-white/90 underline-offset-2 hover:underline"
        >
          Close
        </button>
      </div>
    </div>
  )
}

/** Orange tab label that sits on top of a card, as in the mockup. */
export function CardTab({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`bg-gradient-to-b from-[#f8ba48] to-[#f4a300] rounded-t-2xl rounded-br-2xl border-2 border-white/90 px-3 py-1.5 text-center font-body text-sm font-medium whitespace-nowrap text-white shadow-[0_4px_12px_rgb(244_163_0/0.4)] sm:text-base ${className}`}
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
      <p className="text-outline-blue relative px-3 text-center font-heading text-lg leading-tight font-extrabold italic sm:text-xl">
        {title}
      </p>
    </div>
  )
}

export function ProgramCard({ card }: { card: ProgramCardData }) {
  const [pickerOpen, setPickerOpen] = useState(false)

  return (
    <article className="flex h-full flex-col">
      <CardTab className="relative z-10 mx-4">{card.tab}</CardTab>
      <div className="bg-glass-blue -mt-4 flex flex-1 flex-col gap-3 rounded-3xl border-[3px] border-white/90 px-5 pt-7 pb-5 shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-shadow duration-300 hover:shadow-[0_0_60px_rgba(255,255,255,0.6)]">
        <ProgramThumbnail title={card.title} />
        <div className="flex-1">
          <p className="line-clamp-3 text-left font-body text-[13px] text-white sm:text-justify sm:text-sm">
            {card.description}
          </p>
        </div>
        {card.choices ? (
          <>
            <button
              type="button"
              onClick={() => setPickerOpen(true)}
              className="bg-gold-gloss text-outline-sm font-heading text-body-base inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-white/90 px-8 py-2 font-bold shadow-[0_4px_16px_rgb(245_158_11/0.45)] transition-transform duration-200 hover:scale-[1.03] focus-visible:ring-4 focus-visible:ring-white/60 focus-visible:outline-none active:scale-95"
            >
              Read More <ArrowIcon />
            </button>
            {pickerOpen && (
              <ChoiceDialog title={card.title} choices={card.choices} onClose={() => setPickerOpen(false)} />
            )}
          </>
        ) : (
          <GoldButton href={card.href} className="w-full py-2!">
            Read More <ArrowIcon />
          </GoldButton>
        )}
      </div>
    </article>
  )
}
