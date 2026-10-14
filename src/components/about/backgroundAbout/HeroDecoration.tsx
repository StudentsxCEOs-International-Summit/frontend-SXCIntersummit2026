import lowshotBuilding from '@/assets/about/ic-lowshot-building.svg'
import dice from '@/assets/ic-dice.svg'
import wave from '@/assets/about/ic-wave.svg'

export default function HeroDecoration() {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {/* Building backdrop, washed out in light blue and faded into the page gradient */}
      <img
        src={lowshotBuilding}
        alt=""
        aria-hidden="true"
        className="absolute top-0 left-0 w-[100vw] min-w-full h-[600px] sm:h-[820px] lg:h-screen object-cover object-top opacity-70 scale-110 select-none [mask-image:linear-gradient(to_bottom,black_45%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_45%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-[600px] sm:h-[820px] lg:h-screen bg-[linear-gradient(180deg,rgb(214_226_255/0.75)_0%,rgb(140_175_250/0.55)_40%,rgb(92_130_245/0)_100%)]"
      />
      
      {/* Wave ribbon threading behind the dice */}
      <img 
        src={wave} 
        alt="" 
        className="absolute select-none max-w-none top-[100px] -left-[10%] w-[120%] opacity-80" 
      />

      {/* Dice decorations */}
      <img
        src={dice}
        alt=""
        aria-hidden="true"
        className="animate-float-slow absolute top-[180px] -left-10 w-32 -rotate-12 drop-shadow-xl select-none sm:-left-12 sm:w-52 lg:w-64"
      />
      <img
        src={dice}
        alt=""
        aria-hidden="true"
        className="animate-float absolute top-[400px] -right-10 w-32 rotate-12 drop-shadow-xl select-none sm:-right-12 sm:w-56 lg:w-72"
      />
    </div>
  )
}
