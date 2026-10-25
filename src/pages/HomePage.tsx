import { BlueColorFilterDefs } from '@/components'
import building from '@/assets/ic-buildingus.webp'

function HomePage() {
  return (
    <main className="home-page w-full min-h-screen relative overflow-hidden bg-[#010a30]">
      <section className="relative w-full h-screen overflow-hidden">
        <BlueColorFilterDefs />
        <img
          src={building}
          alt="Background"
          className="absolute inset-0 z-0 w-full h-full object-cover scale-115 origin-center select-none pointer-events-none"
        />
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
        </div>
      </section>
    </main>
  )
}

export default HomePage
