import starIcon from '@/assets/ic-star.svg'
import diamonds from '@/assets/ic-diamonds.svg'
import starYellowGlow from '@/assets/ic-star-yellow-glow.svg'
import orbTopLeft from '@/assets/ic-side-orb.svg'
import orbBottomLeft from '@/assets/ic-abstract-layer-line.svg'
import orbTopRight from '@/assets/ic-orb-abstract-line.svg'

const DECOR = 'absolute h-auto max-w-none select-none'

/** A few stars that pulse at different times so the page never feels frozen (kept sparse on purpose). */
const sparkles = [
  { cls: 'right-6 top-28 w-[clamp(32px,5vw,64px)] rotate-12 sm:right-10 lg:right-16 lg:top-32', delay: '0s' },
  { cls: 'left-3 top-[500px] w-[clamp(32px,5vw,64px)] rotate-6 sm:left-6', delay: '1.4s' },
  { cls: 'bottom-48 left-10 w-[clamp(24px,3vw,36px)] rotate-6 lg:left-20', delay: '2.6s' },
]

export default function RegistrationBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Orbs, drifting very slowly */}
      <img
        src={orbTopLeft}
        alt=""
        className={`${DECOR} animate-sway-slow left-0 top-28 w-[clamp(160px,30vw,360px)] -translate-x-3/4 sm:top-32`}
      />
      <img
        src={orbBottomLeft}
        alt=""
        className={`${DECOR} animate-sway left-0 top-[520px] w-[clamp(220px,40vw,480px)] -translate-x-3/4`}
      />
      <img
        src={orbTopRight}
        alt=""
        className={`${DECOR} animate-sway-slow right-0 top-10 w-[clamp(260px,50vw,620px)] translate-x-[78%]`}
      />

      {/* Glows */}
      <div className="absolute bottom-0 right-0 aspect-square w-[clamp(260px,34vw,440px)] translate-x-2/3 translate-y-[58%] rounded-full bg-gradient-to-tl from-[#1664DC]/50 to-[#C6DBF6]/0" />
      <div className="animate-twinkle absolute bottom-0 left-0 aspect-square w-[clamp(200px,26vw,320px)] -translate-x-[28%] translate-y-[44%] rounded-full bg-[#FFE9B8]/50 blur-3xl" />

      {/* Golden diamonds peeking in from the edges, like the other pages */}
      <img
        src={diamonds}
        alt=""
        className={`${DECOR} animate-sway -left-12 top-[40%] w-20 rotate-[225deg] opacity-80 sm:-left-20 sm:w-32 lg:w-40`}
      />
      <img
        src={diamonds}
        alt=""
        className={`${DECOR} animate-sway-slow -right-12 top-[66%] w-20 rotate-45 opacity-80 sm:-right-20 sm:w-32 lg:w-40`}
      />

      {/* One floating glowing star */}
      <img
        src={starYellowGlow}
        alt=""
        className={`${DECOR} animate-float absolute left-[6%] top-[12%] w-14 -rotate-12 sm:left-[9%] sm:w-20`}
      />

      {/* Twinkling stars */}
      {sparkles.map((s) => (
        <img
          key={s.cls}
          src={starIcon}
          alt=""
          style={{ animationDelay: s.delay }}
          className={`${DECOR} animate-twinkle-star ${s.cls}`}
        />
      ))}
    </div>
  )
}
