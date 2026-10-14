import goldKey from '@/assets/ic-key.svg'
import blueKey from '@/assets/about/ic-blue-key.png'

export default function KeysDecoration() {
  return (
    <div className="absolute top-[800px] left-0 w-full h-[800px] pointer-events-none">
      {/* Gold key on the right */}
      <img
        src={goldKey}
        alt=""
        aria-hidden="true"
        className="absolute top-[10%] -right-4 hidden w-40 rotate-[28deg] drop-shadow-xl select-none md:block lg:-right-16 lg:w-56"
      />
      
      {/* Blue key on the left */}
      <img
        src={blueKey}
        alt=""
        aria-hidden="true"
        className="absolute top-[30%] -left-12 w-32 -rotate-[10deg] opacity-60 select-none lg:-left-[5%] lg:w-[350px]"
      />
    </div>
  )
}
