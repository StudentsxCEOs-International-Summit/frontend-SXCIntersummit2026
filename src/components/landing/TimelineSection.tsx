import { useRef, useEffect, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { timeline, type TimelineItem } from '@/data/landing'
import { SectionTitle } from './ui'

type TimelineStatus = 'past' | 'active' | 'upcoming'

/**
 * Every status renders through the same TimelineCard, but each one supplies
 * its own look. Adding a new status only means adding another entry here.
 */
interface TimelineCardVariant {
  border: string
  surface: string
  text: string
  divider: string
  node: string
}

const cardVariants: Record<TimelineStatus, TimelineCardVariant> = {
  active: {
    border: 'bg-[linear-gradient(100deg,#F4A300_0%,#FFD46B_40%,#FFFFFF_100%)]',
    surface: 'bg-[linear-gradient(135deg,#fff6e0_0%,#fbd878_50%,#f4a300_100%)]',
    text: 'text-ds-black',
    divider: 'bg-ds-black/70',
    node: 'bg-[radial-gradient(circle_at_35%_35%,#fff6e0,#f4a300)]',
  },
  upcoming: {
    border: 'bg-[linear-gradient(100deg,#FFFFFF_0%,#0262F4_85%,#003F9E_100%)]',
    surface: 'bg-[linear-gradient(135deg,#a9c6fb_0%,#6d9ef7_50%,#3e7df3_100%)]',
    text: 'text-white',
    divider: 'bg-white/70',
    node: 'bg-[radial-gradient(circle_at_35%_35%,#ffffff,#86b1ee)]',
  },
  past: {
    border: 'bg-[linear-gradient(100deg,#FFFFFF_0%,#86b1ee_85%,#6d9ef7_100%)]',
    surface: 'bg-[linear-gradient(135deg,#d3e1fb_0%,#a9c6fb_100%)]',
    text: 'text-brand-blue-900',
    divider: 'bg-brand-blue-900/40',
    node: 'bg-[radial-gradient(circle_at_35%_35%,#ffffff,#bfd3f5)]',
  },
}

function getStatus(index: number, activeIndex: number): TimelineStatus {
  if (index === activeIndex) return 'active'
  return index < activeIndex ? 'past' : 'upcoming'
}

function TimelineCard({ item, status }: { item: TimelineItem; status: TimelineStatus }) {
  const v = cardVariants[status]

  return (
    <div
      className={`relative w-[200px] rounded-2xl ${v.border} p-[3px] shadow-[0_8px_20px_rgb(10_63_184/0.25)]`}
    >
      <div
        className={`${v.surface} ${v.text} h-full w-full rounded-[calc(1rem-2px)] px-4 py-4 text-center`}
      >
        <p className="font-body text-[13px] font-medium leading-snug">{item.title}</p>
        <div className={`mx-auto my-2 h-px w-full ${v.divider}`} />
        <p className="font-body text-[11px]">{item.date}</p>
      </div>
    </div>
  )
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: 'left' | 'right'
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'left' ? 'Scroll timeline left' : 'Scroll timeline right'}
      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-primary text-white shadow-md transition hover:scale-105 active:scale-95"
    >
      <svg
        className={`h-4 w-4 ${direction === 'left' ? '' : 'rotate-180'}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    </button>
  )
}

const CARD_STEP = 420

function TimelineSection() {
  const trackRef = useRef<HTMLOListElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef({ startX: 0, startScroll: 0, active: false })

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let animationId: number
    let direction = 1
    const speed = 0.5 // pixels per frame (smooth slow scroll)
    let waitTimeout: ReturnType<typeof setTimeout> | null = null
    let interactionTimeout: ReturnType<typeof setTimeout> | null = null
    let isInteracting = false
    let currentScroll = track.scrollLeft

    const pauseAutoScroll = () => {
      isInteracting = true
      if (interactionTimeout) clearTimeout(interactionTimeout)
      // Resume auto-scroll 2.5 seconds after the user stops interacting
      interactionTimeout = setTimeout(() => {
        isInteracting = false
      }, 2500)
    }

    const scroll = () => {
      const maxScroll = track.scrollWidth - track.clientWidth

      if (maxScroll > 0) {
        // Scroll position moved by something other than us (drag, arrows, scrollbar).
        if (Math.abs(track.scrollLeft - currentScroll) > 2 && !isInteracting) {
          pauseAutoScroll()
        }

        if (!isInteracting && !waitTimeout) {
          currentScroll += speed * direction
          track.scrollLeft = currentScroll

          if (direction === 1 && currentScroll >= maxScroll - 1) {
            currentScroll = maxScroll
            direction = -1
            waitTimeout = setTimeout(() => {
              waitTimeout = null
            }, 10000)
          } else if (direction === -1 && currentScroll <= 0) {
            currentScroll = 0
            direction = 1
            waitTimeout = setTimeout(() => {
              waitTimeout = null
            }, 3000)
          }
        } else if (isInteracting) {
          currentScroll = track.scrollLeft
        }
      }

      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    track.addEventListener('wheel', pauseAutoScroll, { passive: true })
    track.addEventListener('touchmove', pauseAutoScroll, { passive: true })
    track.addEventListener('pointerdown', pauseAutoScroll, { passive: true })

    return () => {
      cancelAnimationFrame(animationId)
      if (waitTimeout) clearTimeout(waitTimeout)
      if (interactionTimeout) clearTimeout(interactionTimeout)
      track.removeEventListener('wheel', pauseAutoScroll)
      track.removeEventListener('touchmove', pauseAutoScroll)
      track.removeEventListener('pointerdown', pauseAutoScroll)
    }
  }, [])

  const scrollByStep = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * CARD_STEP, behavior: 'smooth' })
  }

  // Click-and-drag scrolling for mouse users (touch already scrolls natively).
  const handlePointerDown = (e: ReactPointerEvent<HTMLOListElement>) => {
    if (e.pointerType !== 'mouse' || !trackRef.current) return
    dragRef.current = {
      startX: e.clientX,
      startScroll: trackRef.current.scrollLeft,
      active: true,
    }
    setIsDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: ReactPointerEvent<HTMLOListElement>) => {
    if (!dragRef.current.active || !trackRef.current) return
    trackRef.current.scrollLeft =
      dragRef.current.startScroll - (e.clientX - dragRef.current.startX)
  }

  const endDrag = (e: ReactPointerEvent<HTMLOListElement>) => {
    if (!dragRef.current.active) return
    dragRef.current.active = false
    setIsDragging(false)
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }

  const now = new Date()
  now.setHours(0, 0, 0, 0)

  let activeIndex = timeline.findIndex((item) => new Date(item.endDate) >= now)
  if (activeIndex === -1) {
    activeIndex = timeline.length - 1 // All events in the past, default to last
  }

  return (
    <section
      id="timeline"
      className="relative mx-auto w-full max-w-[1200px] scroll-mt-28 px-4 sm:px-6"
    >
      <SectionTitle className=" bg-[linear-gradient(100deg,#FFFFFF_0%,#0262F4_85%,#003F9E_100%)]">
        Timeline IBCC
      </SectionTitle>

      {/* Gradient border wrapper */}
      <div className="mt-6 rounded-[28px] bg-gradient-to-br from-white/90 to-transparent p-[3px]">
        <div className="overflow-hidden rounded-[calc(28px-3px)] bg-blue-light/85 shadow-[0_12px_32px_rgb(10_63_184/0.3)]">
          <ol
            ref={trackRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className={`grid auto-cols-[210px] grid-flow-col grid-rows-[auto_32px_auto] overflow-x-auto px-6 pt-7 pb-4 select-none sm:px-10 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/60 [&::-webkit-scrollbar-track]:bg-transparent [scrollbar-color:rgb(2_98_244/0.6)_transparent] [scrollbar-width:thin] ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            aria-label="IBCC timeline"
          >
            {timeline.map((item, i) => {
              const top = i % 2 === 0
              const status = getStatus(i, activeIndex)
              const isFirst = i === 0
              const isLast = i === timeline.length - 1

              return (
                <li key={i} className="row-span-3 grid grid-rows-subgrid justify-items-center">
                  <div className={top ? 'row-start-1 self-end' : 'row-start-3 self-start'}>
                    <TimelineCard item={item} status={status} />
                  </div>
                  <div className="relative row-start-2 flex w-full items-center">
                    {isFirst && (
                      <span
                        className="absolute left-0 h-3 w-3 -translate-x-1/2 rounded-full bg-primary"
                        aria-hidden="true"
                      />
                    )}
                    <span className="h-1 w-full bg-primary" />
                    {isLast && (
                      <span
                        className="absolute right-0 h-3 w-3 translate-x-1/2 rounded-full bg-primary"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={`absolute left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-white shadow ${cardVariants[status].node}`}
                      aria-hidden="true"
                    />
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-3">
        <ArrowButton direction="left" onClick={() => scrollByStep(-1)} />
        <ArrowButton direction="right" onClick={() => scrollByStep(1)} />
      </div>
    </section>
  )
}

export default TimelineSection
