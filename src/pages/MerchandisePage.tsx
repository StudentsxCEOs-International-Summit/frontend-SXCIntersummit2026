import { Link } from 'react-router-dom'
import { usePageTitle } from '@/hooks/usePageTitle'
import building from '@/assets/ic-buildingus.webp'
import diamonds from '@/assets/ic-diamonds.svg'
import starGlow from '@/assets/ic-star-glow.svg'
import dice from '@/assets/ic-dice.svg'
import blueDice from '@/assets/ic-blue-dice.svg'
import Footer from '@/components/landing/Footer'
import { SectionTitle } from '@/components/landing/ui'

function MerchandisePage() {
  usePageTitle('Merchandise')

  return (
    <div className="bg-landing relative overflow-hidden">
      <section
        id="merchandise"
        className="relative flex min-h-[88svh] items-center justify-center px-4 pt-32 pb-24 sm:min-h-screen sm:pt-44 sm:pb-32"
      >
        {/* Same building backdrop + wash as the Home hero */}
        <img
          src={building}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full scale-115 origin-center object-cover select-none [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(214_226_255/0.55)_0%,rgb(92_130_245/0.45)_40%,rgb(92_130_245/0)_100%)] [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]" />

        {/* Decorations (slow, transform-only motion) */}
        <img
          src={diamonds}
          alt=""
          aria-hidden="true"
          className="animate-sway pointer-events-none absolute top-16 -left-12 w-44 rotate-225 sm:-top-4 sm:-left-28 sm:w-96"
        />
        <img
          src={starGlow}
          alt=""
          aria-hidden="true"
          className="animate-twinkle pointer-events-none absolute -bottom-6 -left-10 w-40 -rotate-12 sm:-bottom-10 sm:-left-20 sm:w-72"
        />
        <img
          src={dice}
          alt=""
          aria-hidden="true"
          className="animate-float pointer-events-none absolute top-[14%] -right-10 hidden w-40 rotate-12 drop-shadow-xl select-none sm:block lg:w-60"
        />
        <img
          src={blueDice}
          alt=""
          aria-hidden="true"
          className="animate-float-slow pointer-events-none absolute -right-6 -bottom-4 w-36 -rotate-12 drop-shadow-xl select-none sm:right-6 sm:w-48 lg:w-56"
        />

        <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
          <SectionTitle className="bg-[linear-gradient(100deg,#FFFFFF_0%,#0262F4_85%,#003F9E_100%)]">
            Merchandise
          </SectionTitle>

          <h1
            className="font-heading text-5xl leading-tight font-extrabold tracking-tight text-white italic md:text-7xl"
            style={{ textShadow: '0 3px 0 #003F9E, 0 0 22px rgba(2, 98, 244, 0.7)' }}
          >
            Coming Soon
          </h1>

          <p
            className="font-body mt-4 max-w-xl text-sm text-white sm:text-lg"
            style={{ textShadow: '0 1px 6px rgba(0, 63, 158, 0.7)' }}
          >
            Our official summit merchandise is on its way. Stay tuned and be the first to wear it!
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="bg-gold-gloss text-outline-sm font-heading text-body-base inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/90 px-8 py-2.5 font-bold shadow-[0_4px_16px_rgb(245_158_11/0.45)] transition-transform duration-200 hover:scale-[1.03] focus-visible:ring-4 focus-visible:ring-white/60 focus-visible:outline-none active:scale-95"
            >
              Back to Home
            </Link>
            <Link
              to="/ibcc"
              className="font-heading text-body-base inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/90 bg-white/20 px-8 py-2.5 font-bold text-white shadow-[0_4px_16px_rgba(2,98,244,0.3)] transition-transform duration-200 hover:scale-[1.03] focus-visible:ring-4 focus-visible:ring-white/60 focus-visible:outline-none active:scale-95"
            >
              Explore IBCC
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default MerchandisePage
