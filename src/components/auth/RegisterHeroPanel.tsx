import logo from '@/assets/ic-icon-internasional.svg'
import building from '@/assets/ic-buildingus.svg'
import diamonds from '@/assets/ic-diamonds.svg'
import starGlow from '@/assets/ic-star-glow.svg'
import { OutlinedText } from '@/components/about/AboutShared'
import { Dot } from '@/components/ui'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export interface RegisterHeroPanelProps {
  showBackButton?: boolean
  backHref?: string
  backLabel?: string
}

/**
 * Left panel of the login / register screens. It reuses the Home hero's building backdrop,
 * 3D diamonds, glowing star and outlined title so the auth pages feel like the same site.
 */
export function RegisterHeroPanel({
  showBackButton = true,
  backHref = '/',
  backLabel = 'Back to Home',
}: RegisterHeroPanelProps = {}) {
  return (
    <div className="bg-landing relative hidden h-full w-1/2 overflow-hidden lg:block">
      <img
        src={building}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full scale-115 origin-center object-cover select-none [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(214_226_255/0.55)_0%,rgb(92_130_245/0.45)_40%,rgb(92_130_245/0)_100%)]" />

      {/* Decorations: same assets and slow motion as the Home hero */}
      <img
        src={diamonds}
        alt=""
        aria-hidden="true"
        className="animate-sway pointer-events-none absolute -top-6 right-[8%] w-44 rotate-[200deg] select-none xl:w-64"
      />
      <img
        src={diamonds}
        alt=""
        aria-hidden="true"
        className="animate-sway-slow pointer-events-none absolute top-[34%] -right-12 w-36 rotate-45 select-none xl:w-52"
      />
      <img
        src={starGlow}
        alt=""
        aria-hidden="true"
        className="animate-twinkle pointer-events-none absolute -bottom-8 -left-12 w-44 -rotate-12 select-none xl:w-64"
      />

      <div className="relative z-10 flex h-full flex-col justify-between px-10 py-6 lg:px-16 xl:px-24">
        <div>
          {showBackButton && (
            <div className="mb-4">
              <Link
                to={backHref}
                className="group inline-flex items-center gap-2 rounded-full border-2 border-white/80 bg-white/20 px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(2,98,244,0.3)] backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white/30 active:scale-95"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                <span>{backLabel}</span>
              </Link>
            </div>
          )}
          <img
            src={logo}
            alt="StudentsxCEOs"
            className="mb-4 h-20 w-20 drop-shadow-lg lg:h-28 lg:w-28 xl:h-32 xl:w-32"
          />
          <h1 className="font-heading leading-tight select-none">
            <OutlinedText
              stroke={8}
              className="block text-2xl font-bold tracking-tight lg:text-4xl xl:text-5xl"
            >
              StudentsxCEOs
            </OutlinedText>
            <OutlinedText
              stroke={8}
              className="mt-1 block text-xl font-extrabold tracking-tight italic lg:text-3xl xl:text-4xl"
            >
              International Summit 2026
            </OutlinedText>
          </h1>
          <p
            className="mt-4 flex items-center gap-3 text-sm font-medium tracking-[0.18em] text-white lg:text-base xl:text-xl"
            style={{ textShadow: '0 1px 6px rgba(0, 63, 158, 0.7)' }}
          >
            <span>Connect</span>
            <Dot size={8} />
            <span>Learn</span>
            <Dot size={8} />
            <span>Grow</span>
          </p>
        </div>

        <div className="bg-glass-blue mb-6 max-w-sm rounded-2xl border-2 border-white/80 p-4 shadow-[0_0_24px_rgba(2,98,244,0.45)]">
          <span className="bg-gold-gloss mb-3 block h-2.5 w-16 rounded-full" />
          <h3 className="font-heading text-lg font-bold text-white lg:text-xl">
            International Summit 2026
          </h3>
          <p className="mt-1 text-sm text-white/90 lg:text-base">Connect with future leaders</p>
        </div>
      </div>
    </div>
  )
}
