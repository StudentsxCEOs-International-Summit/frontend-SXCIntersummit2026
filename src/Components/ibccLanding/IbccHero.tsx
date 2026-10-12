import building from '@/assets/ic-buildingus.svg'
import starYellowGlow from '@/assets/ic-star_yellowglow.svg'
import cursor from '@/assets/ic-cursor.svg'
import { GoldButton } from '@/Components/landing/ui'

export function IbccHero() {
  return (
    <section
      id="ibcc-hero"
      className="relative flex items-center justify-center px-4 pt-36 pb-36 sm:pt-44 sm:pb-48 min-h-[85vh] sm:min-h-screen overflow-hidden"
    >
      {/* Background Architectural Building */}
      <img
        src={building}
        alt="Background"
        className="absolute inset-0 z-0 w-full h-full object-cover scale-115 origin-center select-none pointer-events-none [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]"
      />

      {/* Blue Atmospheric Overlay Gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(214_226_255/0.45)_0%,rgb(42_112_235/0.75)_50%,rgb(10_35_110/0.95)_100%)] [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]" />

      {/* Architectural Light Arch Curve */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden opacity-80"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
        >
          <path
            d="M -100 700 C 300 200, 1100 150, 1600 550"
            stroke="url(#archGlow)"
            strokeWidth="90"
            strokeLinecap="round"
            className="blur-sm"
          />
          <path
            d="M -100 700 C 300 200, 1100 150, 1600 550"
            stroke="white"
            strokeWidth="26"
            strokeLinecap="round"
            opacity="0.4"
          />
          <defs>
            <linearGradient id="archGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#99C2FF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#1E5FE9" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating 3D Gold Star on the left */}
      <img
        src={starYellowGlow}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-8 sm:left-4 bottom-[10%] sm:bottom-[15%] w-48 sm:w-68 md:w-84 rotate-[-15deg] select-none drop-shadow-[0_15px_35px_rgba(245,158,11,0.6)]"
      />

      {/* Floating 3D Gold Star on the right */}
      <img
        src={starYellowGlow}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 sm:right-4 top-[15%] sm:top-[20%] w-44 sm:w-64 md:w-80 rotate-[18deg] select-none drop-shadow-[0_15px_35px_rgba(245,158,11,0.6)]"
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-4">
        {/* Main Title */}
        <h1 className="flex flex-col items-center justify-center leading-tight select-none">
          {/* Line 1: International */}
          <div className="relative inline-block">
            <span
              aria-hidden="true"
              className="absolute inset-0 px-5 text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight select-none pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #003F9E 0%, #0262F4 65%, #FFFFFF 150%)',
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
            <span className="relative block px-5 text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
              International
            </span>
          </div>

          {/* Line 2: Business Case Competition */}
          <div className="relative inline-block mt-1 sm:mt-2">
            <span
              aria-hidden="true"
              className="absolute inset-0 px-5 text-3xl md:text-6xl lg:text-7xl font-extrabold italic tracking-tight select-none pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #003F9E 0%, #0262F4 65%, #FFFFFF 150%)',
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
            <span className="relative block px-5 text-3xl md:text-6xl lg:text-7xl font-extrabold italic tracking-tight text-white">
              Business Case Competition
            </span>
          </div>
        </h1>

        {/* Buttons Row with Animated Cursor */}
        <div className="relative mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <GoldButton href="/register" className="text-base sm:text-lg px-8 py-3">
            Register Now
          </GoldButton>

          <a
            href="https://drive.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/90 bg-white/20 backdrop-blur-md px-8 py-3 font-heading text-base sm:text-lg font-bold text-white shadow-[0_4px_16px_rgba(2,98,244,0.3)] transition-transform duration-200 hover:scale-[1.03] active:scale-95"
          >
            <svg
              className="w-5 h-5 text-white fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19 2H6c-1.2 0-2 .8-2 2v16c0 1.2.8 2 2 2h13c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1zm-1 18H6c-.6 0-1-.4-1-1V5c0-.6.4-1 1-1h12v16z" />
              <path d="M8 7h8v2H8zm0 4h8v2H8zm0 4h5v2H8z" />
            </svg>
            <span>View Booklet</span>
          </a>

          {/* Animated pointer cursor pointing to Register Now */}
          <img
            src={cursor}
            alt=""
            className="animate-float absolute -bottom-10 left-[24%] sm:left-[32%] w-10 sm:w-12 pointer-events-none select-none"
          />
        </div>
      </div>
    </section>
  )
}

export default IbccHero
