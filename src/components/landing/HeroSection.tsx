import building from '@/assets/ic-buildingus.svg'
import diamonds from '@/assets/ic-diamonds.svg'
import starGlow from '@/assets/ic-star-glow.svg'
import cursor from '@/assets/ic-cursor.svg'
import { ArrowIcon, GoldButton } from './ui'

// TODO: swap `buildings` for the hero building photo once it's exported from Figma.
function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex  items-center justify-center px-4 pt-32 pb-40 sm:min-h-screen"
    >
      <img
        src={building}
        alt="Background"
        className="absolute inset-0 z-0 w-full h-full object-cover scale-115 origin-center select-none pointer-events-none [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(214_226_255/0.55)_0%,rgb(92_130_245/0.45)_40%,rgb(92_130_245/0)_100%)] [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]" />

      <img
        src={diamonds}
        alt=""
        className="absolute -top-4 -left-24 w-56 sm:-left-28 sm:w-96 rotate-225"
      />
      <img
        src={diamonds}
        alt=""
        className="absolute top-[45%] -right-24 w-56 sm:-right-24 sm:w-96 rotate-45 "
      />
      <img src={starGlow} alt="" className="absolute -bottom-10 -left-24 w-56 -rotate-12 sm:w-80" />

      <div className="relative z-10 flex h-full justify-center text-center items-center align-middle flex-col">
        <h1 className="flex flex-col items-center justify-center leading-tight select-none ">
          {/* Line 1: StudentsxCEOs */}
          <div className="relative inline-block">
            <span
              aria-hidden="true"
              className="absolute inset-0 px-5 text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight select-none pointer-events-none"
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
              StudentsxCEOs
            </span>
            <span className="relative block px-5 text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
              StudentsxCEOs
            </span>
          </div>

          {/* Line 2: International Summit 2026 (All Italic) */}
          <div className="relative inline-block mt-1 sm:mt-2">
            <span
              aria-hidden="true"
              className="absolute inset-0 px-5 text-3xl md:text-6xl lg:text-7xl font-extrabold italic tracking-tight select-none pointer-events-none"
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
              International Summit 2026
            </span>
            <span className="relative block px-5 text-3xl md:text-6xl lg:text-7xl font-extrabold italic tracking-tight text-white">
              International Summit 2026
            </span>
          </div>
        </h1>
        <h3 className="text-xl p-5 md:text-3xl text-white font-medium tracking-wide">
          <div className="relative inline-block">
            <span
              aria-hidden="true"
              className="absolute inset-0 px-5 text-xl md:text-3xl lg:text-4xl tracking-tight select-none pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(90deg, #003F9E 0%, #0262F4 75%, #FFFFFF 120%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                WebkitTextStroke: '10px transparent',
                paintOrder: 'stroke fill',
                filter:
                  'drop-shadow(0 0 12px rgba(2, 98, 244, 0.5)) drop-shadow(0 4px 10px rgba(0, 63, 158, 0.6))',
              }}
            >
              Foster True Innovation
            </span>
            <span className="relative block px-5 text-xl md:text-3xl lg:text-4xl tracking-tight text-white">
              Foster True Innovation
            </span>
          </div>
        </h3>
        <div className="relative mt-10">
          <GoldButton href="#about">
            Get Started <ArrowIcon diagonal />
          </GoldButton>
          <img
            src={cursor}
            alt=""
            className="animate-float absolute -right-24 top-12 hidden w-12 sm:block"
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
