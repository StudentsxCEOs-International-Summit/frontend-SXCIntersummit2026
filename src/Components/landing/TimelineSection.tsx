import { useRef, useEffect } from 'react'
import { timeline, type TimelineItem } from '@/data/landing'
import { SectionTitle } from './ui'

function TimelineCard({ item, isActive }: { item: TimelineItem; isActive: boolean }) {
  const tone = isActive
    ? 'bg-[linear-gradient(135deg,#fff6e0_0%,#fbd878_50%,#f4a300_100%)] text-ds-black'
    : 'bg-[linear-gradient(135deg,#a9c6fb_0%,#6d9ef7_50%,#3e7df3_100%)] text-white'
  const divider = isActive ? 'bg-ds-black/70' : 'bg-white/70'

  return (
    <div className={`w-[250px] relative rounded-2xl ${isActive ? 'bg-[linear-gradient(100deg,#F4A300_0%,#FFD46B_40%,#FFFFFF_100%)]' : 'bg-[linear-gradient(100deg,#FFFFFF_0%,#0262F4_85%,#003F9E_100%)]'} p-1 shadow-[0_8px_20px_rgb(10_63_184/0.25)]`}>
      <div className={`${tone} h-full w-full rounded-[calc(1rem-2px)] px-6 py-6 text-center`}>
        <p className="font-body text-sm font-medium">{item.title}</p>
        <div className={`mx-auto my-3 h-px w-full ${divider}`} />
        <p className="font-body text-xs">{item.date}</p>
      </div>
    </div>
  )
}

function TimelineSection() {
  const trackRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let animationId: number
    let direction = 1
    let speed = 0.5 // pixels per frame (smooth slow scroll)
    let waitTimeout: ReturnType<typeof setTimeout> | null = null
    let interactionTimeout: ReturnType<typeof setTimeout> | null = null
    let isInteracting = false
    let currentScroll = track.scrollLeft

    const scroll = () => {
      const maxScroll = track.scrollWidth - track.clientWidth
      
      // If no scrollable area, do nothing
      if (maxScroll <= 0) {
        animationId = requestAnimationFrame(scroll)
        return
      }

      if (!isInteracting && !waitTimeout) {
        currentScroll += speed * direction
        track.scrollLeft = currentScroll

        // Wait at the end
        if (direction === 1 && currentScroll >= maxScroll - 1) {
          currentScroll = maxScroll
          direction = -1
          waitTimeout = setTimeout(() => {
            waitTimeout = null
          }, 10000) // 10 seconds wait
        } 
        // Wait at the beginning
        else if (direction === -1 && currentScroll <= 0) {
          currentScroll = 0
          direction = 1
          waitTimeout = setTimeout(() => {
            waitTimeout = null
          }, 3000) // 10 seconds wait
        }
      } else if (isInteracting) {
        // Keep our internal tracker in sync if the user manually scrolls
        currentScroll = track.scrollLeft
      }
      
      animationId = requestAnimationFrame(scroll)
    }

    // Start loop
    animationId = requestAnimationFrame(scroll)

    const handleInteraction = () => {
      isInteracting = true
      if (interactionTimeout) clearTimeout(interactionTimeout)
      // Resume auto-scroll 2.5 seconds after the user stops interacting
      interactionTimeout = setTimeout(() => {
        isInteracting = false
      }, 2500) 
    }
    
    // Pause only on actual scrolling/interaction, not just hovering
    track.addEventListener('wheel', handleInteraction, { passive: true })
    track.addEventListener('touchmove', handleInteraction, { passive: true })
    track.addEventListener('pointerdown', handleInteraction, { passive: true })

    return () => {
      cancelAnimationFrame(animationId)
      if (waitTimeout) clearTimeout(waitTimeout)
      if (interactionTimeout) clearTimeout(interactionTimeout)
      track.removeEventListener('wheel', handleInteraction)
      track.removeEventListener('touchmove', handleInteraction)
      track.removeEventListener('pointerdown', handleInteraction)
    }
  }, [])

  const now = new Date()
  now.setHours(0, 0, 0, 0)
  
  let activeIndex = timeline.findIndex(item => new Date(item.endDate) >= now)
  if (activeIndex === -1) {
    activeIndex = timeline.length - 1 // All events in the past, default to last
  }

  return (
    <section
      id="timeline"
      className="w-full relative mx-auto max-w-[1200px] scroll-mt-28 px-4 sm:px-6"
    >
      <SectionTitle className=" bg-[linear-gradient(100deg,#FFFFFF_0%,#0262F4_85%,#003F9E_100%)]">Timeline</SectionTitle>

      {/* Gradient border wrapper */}
      <div className="mt-12 rounded-[32px] bg-gradient-to-br from-white/90 to-transparent p-[3px]">
        <div className="bg-blue-light/85 rounded-[calc(32px-3px)] shadow-[0_12px_32px_rgb(10_63_184/0.3)] overflow-hidden">
          <ol
            ref={trackRef}
            className="grid auto-cols-[255px] grid-flow-col grid-rows-[auto_40px_auto] overflow-x-auto px-6 py-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-12"
            aria-label="Event timeline"
          >
            {timeline.map((item, i) => {
              const top = i % 2 === 0
              const isActive = i === activeIndex
              const isFirst = i === 0
              const isLast = i === timeline.length - 1
              
              return (
                <li
                  key={i}
                  className="row-span-3 grid grid-rows-subgrid justify-items-center"
                >
                  <div className={top ? 'row-start-1 self-end' : 'row-start-3 self-start'}>
                    <TimelineCard item={item} isActive={isActive} />
                  </div>
                  <div className="relative row-start-2 flex w-full items-center">
                    {isFirst && (
                      <span className="absolute left-0 h-3 w-3 -translate-x-1/2 rounded-full bg-primary" aria-hidden="true" />
                    )}
                    <span className="h-1 w-full bg-primary" />
                    {isLast && (
                      <span className="absolute right-0 h-3 w-3 translate-x-1/2 rounded-full bg-primary" aria-hidden="true" />
                    )}
                    <span
                      className={`absolute left-1/2 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-white shadow ${isActive
                          ? 'bg-[radial-gradient(circle_at_35%_35%,#fff6e0,#f4a300)]'
                          : 'bg-[radial-gradient(circle_at_35%_35%,#ffffff,#86b1ee)]'
                        }`}
                      aria-hidden="true"
                    />
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default TimelineSection
