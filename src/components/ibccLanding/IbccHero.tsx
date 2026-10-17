import building from '@/assets/ic-buildingus.svg'
import diamonds from '@/assets/ic-diamonds.svg'
import starGlow from '@/assets/ic-star-glow.svg'
import cursor from '@/assets/ic-cursor.svg'
import { GoldButton } from '@/components/landing/ui'

/**
 * Mirrors the Home hero (same size, backdrop, decorations and title treatment)
 * so the two pages feel like one site.
 */
export function IbccHero() {
  return (
    <section
      id="ibcc-hero"
      className="relative flex min-h-[88svh] items-center justify-center px-4 pt-32 pb-24 sm:min-h-screen sm:pt-52 sm:pb-32"
    >
      <img
        src={building}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full scale-115 origin-center object-cover select-none [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(214_226_255/0.55)_0%,rgb(92_130_245/0.45)_40%,rgb(92_130_245/0)_100%)] [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]" />

      {/* Decorations drift very slowly; transform-only so it stays light. */}
      <img
        src={diamonds}
        alt=""
        aria-hidden="true"
        className="animate-sway pointer-events-none absolute top-16 -left-12 w-44 rotate-225 sm:-top-4 sm:-left-28 sm:w-96"
      />
      <img
        src={diamonds}
        alt=""
        aria-hidden="true"
        className="animate-sway-slow pointer-events-none absolute top-[78%] -right-12 w-40 rotate-45 sm:top-[45%] sm:-right-24 sm:w-96"
      />
      <img
        src={starGlow}
        alt=""
        aria-hidden="true"
        className="animate-twinkle pointer-events-none absolute -bottom-6 -left-10 w-44 -rotate-12 sm:-bottom-10 sm:-left-24 sm:w-80"
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
        <h1 className="flex flex-col items-center justify-center leading-tight select-none">
          {/* Line 1: International */}
          <div className="relative inline-block">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 px-5 text-3xl font-bold tracking-tight select-none md:text-6xl lg:text-7xl"
              style={{
                backgroundImage: 'linear-gradient(90deg, #003F9E 0%, #0262F4 65%, #FFFFFF 110%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                WebkitTextStroke: '10px transparent',
                paintOrder: 'stroke fill',
                filter:
                  'drop-shadow(0 0 12px rgba(2, 98, 244, 0.5)) drop-shadow(0 4px 10px rgba(0, 63, 158, 0.6))',
              }}
            >
              International
            </span>
            <span className="relative block px-5 text-3xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
              International
            </span>
          </div>

          {/* Line 2: Business Case Competition */}
          <div className="relative mt-1 inline-block sm:mt-2">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 px-5 text-3xl font-extrabold tracking-tight italic select-none md:text-6xl lg:text-7xl"
              style={{
                backgroundImage: 'linear-gradient(90deg, #003F9E 0%, #0262F4 65%, #FFFFFF 120%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                WebkitTextStroke: '10px transparent',
                paintOrder: 'stroke fill',
                filter:
                  'drop-shadow(0 0 12px rgba(2, 98, 244, 0.5)) drop-shadow(0 4px 10px rgba(0, 63, 158, 0.6))',
              }}
            >
              Business Case Competition
            </span>
            <span className="relative block px-5 text-3xl font-extrabold tracking-tight text-white italic md:text-6xl lg:text-7xl">
              Business Case Competition
            </span>
          </div>
        </h1>

        {/* Buttons, with the same animated cursor as the Home hero */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <div className="relative">
            <GoldButton href="/register">Register Now</GoldButton>
            <img
              src={cursor}
              alt=""
              aria-hidden="true"
              className="animate-float pointer-events-none absolute top-8 -right-8 w-9 select-none sm:top-12 sm:-right-10 sm:w-12"
            />
          </div>

          <a
            href="https://drive.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading text-body-base inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/90 bg-white/20 px-8 py-2.5 font-bold text-white shadow-[0_4px_16px_rgba(2,98,244,0.3)] transition-transform duration-200 hover:scale-[1.03] focus-visible:ring-4 focus-visible:ring-white/60 focus-visible:outline-none active:scale-95"
          >
            View Booklet
          </a>
        </div>
      </div>
    </section>
  )
}

export default IbccHero
