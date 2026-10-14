import yellowChess from '@/assets/ic-yellow-chess.svg'
import blueDiamonds from '@/assets/ic-blue-diamonds.svg'
import loopCurveLine from '@/assets/ic-loop-curveline.svg'

export default function GeometricDecoration() {
  return (
    <div className="absolute top-[1600px] left-0 w-full h-[1200px] pointer-events-none">
      <img 
        src={yellowChess} 
        alt="" 
        className="absolute top-[20%] -left-8 w-32 -rotate-12 hidden md:block" 
      />
      <img 
        src={blueDiamonds} 
        alt="" 
        className="absolute top-[40%] right-0 w-40 rotate-12 hidden md:block" 
      />
      
      {/* Looping line near the bottom */}
      <img 
        src={loopCurveLine} 
        alt="" 
        className="absolute bottom-0 left-0 w-full opacity-60 max-w-none" 
      />
    </div>
  )
}
