import { useEffect, useMemo, useState } from 'react'
import { usePageTitle } from '@/hooks/usePageTitle'
import { OutlinedText } from '@/components/about/AboutShared'
import Footer from '@/components/landing/Footer'
import building from '@/assets/ic-buildingus.svg'
import goldKey from '@/assets/ic-key.svg'
import {
  galleryFilters,
  galleryItems,
  type GalleryFilter,
  type GalleryItem,
} from '@/data/gallery'

/**
 * The mosaic repeats these row shapes, like the design: three across, two across,
 * three across, one tall photo beside two stacked ones, then a wide centre photo.
 * Each shape consumes `count` photos; a short final row just shares the space equally.
 */
type RowShape = 'three' | 'two' | 'featureRight' | 'wideCenter'

const rowPattern: { shape: RowShape; count: number }[] = [
  { shape: 'three', count: 3 },
  { shape: 'two', count: 2 },
  { shape: 'three', count: 3 },
  { shape: 'featureRight', count: 3 },
  { shape: 'wideCenter', count: 3 },
]

function chunkIntoRows(items: GalleryItem[]) {
  const rows: { shape: RowShape; items: GalleryItem[] }[] = []
  let cursor = 0
  let p = 0
  while (cursor < items.length) {
    const { shape, count } = rowPattern[p % rowPattern.length]
    const slice = items.slice(cursor, cursor + count)
    rows.push({ shape: slice.length < count ? 'three' : shape, items: slice })
    cursor += count
    p += 1
  }
  return rows
}

function Tile({
  item,
  className = '',
  onOpen,
}: {
  item: GalleryItem
  className?: string
  onOpen: (item: GalleryItem) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      aria-label={`Open photo: ${item.alt}`}
      className={`group relative block h-full w-full cursor-zoom-in overflow-hidden rounded-xl border border-white/60 bg-white/20 shadow-[0_6px_18px_rgba(0,40,130,0.3)] focus-visible:ring-4 focus-visible:ring-white/70 focus-visible:outline-none ${className}`}
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        style={{ objectPosition: item.focus }}
      />
    </button>
  )
}

function Mosaic({
  items,
  onOpen,
}: {
  items: GalleryItem[]
  onOpen: (item: GalleryItem) => void
}) {
  const rows = useMemo(() => chunkIntoRows(items), [items])

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {rows.map((row, i) => {
        const [a, b, c] = row.items

        if (row.shape === 'two') {
          return (
            <div key={i} className="grid h-40 grid-cols-2 gap-3 sm:h-56 sm:gap-4 lg:h-64">
              {row.items.map((it) => (
                <Tile key={it.id} item={it} onOpen={onOpen} />
              ))}
            </div>
          )
        }

        if (row.shape === 'featureRight') {
          return (
            <div
              key={i}
              className="grid h-72 grid-cols-2 grid-rows-2 gap-3 sm:h-[26rem] sm:gap-4 lg:h-[30rem]"
            >
              <div className="min-h-0">
                <Tile item={a} onOpen={onOpen} />
              </div>
              <div className="row-span-2 min-h-0">
                <Tile item={c} onOpen={onOpen} />
              </div>
              <div className="min-h-0">
                <Tile item={b} onOpen={onOpen} />
              </div>
            </div>
          )
        }

        if (row.shape === 'wideCenter') {
          return (
            <div
              key={i}
              className="grid h-36 grid-cols-[1fr_1.6fr_1fr] gap-3 sm:h-52 sm:gap-4 lg:h-60"
            >
              {row.items.map((it) => (
                <Tile key={it.id} item={it} onOpen={onOpen} />
              ))}
            </div>
          )
        }

        return (
          <div
            key={i}
            className="grid h-32 gap-3 sm:h-48 sm:gap-4 lg:h-56"
            style={{ gridTemplateColumns: `repeat(${row.items.length}, minmax(0, 1fr))` }}
          >
            {row.items.map((it) => (
              <Tile key={it.id} item={it} onOpen={onOpen} />
            ))}
          </div>
        )
      })}
    </div>
  )
}

function Lightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [onClose])

  return (
    <div
      className="animate-modal-fade fixed inset-0 z-[100] flex items-center justify-center bg-[#0a2a7a]/70 p-4 backdrop-blur-md"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={item.alt}
        onClick={(e) => e.stopPropagation()}
        className="animate-modal-pop relative max-h-full max-w-4xl"
      >
        <img
          src={item.src}
          alt={item.alt}
          className="max-h-[85vh] w-auto rounded-2xl border-2 border-white/80 object-contain shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close photo"
          className="absolute -top-3 -right-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#0262F4] bg-white text-[#0262F4] shadow-md transition hover:scale-105 focus-visible:ring-4 focus-visible:ring-white/70 focus-visible:outline-none"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function GalleryPage() {
  usePageTitle('Gallery')
  const [filter, setFilter] = useState<GalleryFilter>('All')
  const [active, setActive] = useState<GalleryItem | null>(null)

  const visible = useMemo(
    () => (filter === 'All' ? galleryItems : galleryItems.filter((i) => i.category === filter)),
    [filter],
  )

  return (
    <div className="bg-landing relative overflow-hidden">
      {/* Hero */}
      <section
        id="gallery-hero"
        className="relative flex min-h-[70svh] items-center justify-center px-4 pt-32 pb-24 sm:min-h-[85vh] sm:pt-44"
      >
        <img
          src={building}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full scale-115 origin-center object-cover select-none [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(214_226_255/0.55)_0%,rgb(92_130_245/0.45)_40%,rgb(92_130_245/0)_100%)] [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]" />

        <img
          src={goldKey}
          alt=""
          aria-hidden="true"
          className="animate-key-gold pointer-events-none absolute top-24 -left-6 w-24 -rotate-[28deg] select-none sm:top-28 sm:left-6 sm:w-40 lg:w-52"
        />
        <img
          src={goldKey}
          alt=""
          aria-hidden="true"
          className="animate-key-blue pointer-events-none absolute top-[30%] -right-6 w-28 rotate-[28deg] select-none sm:right-6 sm:w-44 lg:w-60"
        />

        <h1 className="relative z-10 text-center select-none">
          <OutlinedText
            stroke={10}
            className="font-heading text-5xl font-extrabold tracking-tight italic md:text-7xl"
          >
            Gallery
          </OutlinedText>
        </h1>

        <a
          href="#gallery"
          className="group absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white focus-visible:outline-none"
        >
          <span className="font-body text-sm font-medium tracking-wide drop-shadow sm:text-base">
            Scroll More
          </span>
          <svg
            className="h-4 w-4 animate-bounce"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </a>
      </section>

      {/* Filter + mosaic */}
      <section
        id="gallery"
        aria-label="Photo gallery"
        className="relative mx-auto w-full max-w-[1000px] scroll-mt-28 px-4 pb-20 sm:px-6"
      >
        <div
          role="tablist"
          aria-label="Filter photos"
          className="bg-glass-blue mx-auto mb-8 flex w-fit items-center gap-1 rounded-full border-2 border-white/90 p-1 shadow-[0_0_24px_rgba(2,98,244,0.45)]"
        >
          {galleryFilters.map((name) => {
            const selected = filter === name
            return (
              <button
                key={name}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setFilter(name)}
                className={`font-heading cursor-pointer rounded-full px-5 py-1.5 text-sm font-semibold transition focus-visible:ring-4 focus-visible:ring-white/60 focus-visible:outline-none sm:px-7 sm:text-base ${
                  selected
                    ? 'bg-[#0262F4] text-white shadow-[0_2px_8px_rgba(2,98,244,0.6)]'
                    : 'text-white/90 hover:bg-white/15'
                }`}
              >
                {name}
              </button>
            )
          })}
        </div>

        <Mosaic items={visible} onOpen={setActive} />
      </section>

      <Footer />

      {active && <Lightbox item={active} onClose={() => setActive(null)} />}
    </div>
  )
}

export default GalleryPage
