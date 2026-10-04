import starIcon from '@/assets/ic-star.svg'
import orbTopLeft from '@/assets/ic-side-orb.svg'
import orbBottomLeft from '@/assets/ic-abstract-layer-line.svg'
import orbTopRight from '@/assets/ic-orb-abstract-line.svg'

const DECOR = 'absolute h-auto max-w-none select-none'

export default function RegistrationBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Orbs */}
      <img
        src={orbTopLeft}
        alt=""
        className={`${DECOR} left-0 top-28 w-[clamp(160px,30vw,360px)] -translate-x-3/4 sm:top-32`}
      />
      <img
        src={orbBottomLeft}
        alt=""
        className={`${DECOR} left-0 top-[520px] w-[clamp(220px,40vw,480px)] -translate-x-3/4`}
      />
      <img
        src={orbTopRight}
        alt=""
        className={`${DECOR} right-0 top-10 w-[clamp(260px,50vw,620px)] translate-x-[78%]`}
      />

      {/* Glows */}
      <div className="absolute bottom-0 right-0 aspect-square w-[clamp(260px,34vw,440px)] translate-x-2/3 translate-y-[58%] rounded-full bg-gradient-to-tl from-[#1664DC]/50 to-[#C6DBF6]/0" />
      <div className="absolute bottom-0 left-0 aspect-square w-[clamp(200px,26vw,320px)] -translate-x-[28%] translate-y-[44%] rounded-full bg-[#FFE9B8]/50 blur-3xl" />

      {/* Stars */}
      <img
        src={starIcon}
        alt=""
        className={`${DECOR} right-6 top-28 w-[clamp(32px,5vw,64px)] rotate-12 sm:right-10 lg:right-16 lg:top-32`}
      />
      <img
        src={starIcon}
        alt=""
        className={`${DECOR} left-3 top-[500px] w-[clamp(32px,5vw,64px)] rotate-6 sm:left-6`}
      />
      <img
        src={starIcon}
        alt=""
        className={`${DECOR} bottom-48 left-10 w-[clamp(24px,3vw,36px)] rotate-6 lg:left-20`}
      />
    </div>
  )
}
