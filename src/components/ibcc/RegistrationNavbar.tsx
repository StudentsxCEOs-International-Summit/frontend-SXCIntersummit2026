import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import logo from '@/assets/ic-icon-internasional.svg'
import waves from '@/assets/ic-line-wave.svg'
import rectangle from '@/assets/ic-rectangle-asbtract.svg'

const TAGLINE = ['Connect', 'Learn', 'Grow']

export default function RegistrationNavbar() {
  return (
    <header className="relative z-10 overflow-hidden bg-gradient-to-r from-[#DCEAFF] via-[#EDF5FF] to-[#E3EEFF] shadow-[0_4px_20px_rgba(30,64,175,0.10)]">
      <img
        src={rectangle}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-25 -top-[140px] h-auto w-[222px] max-w-none select-none"
      />
      <img
        src={waves}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-[90px] hidden h-auto w-[760px] max-w-none select-none md:block lg:-right-30 lg:w-[750px]"
      />

      <div className="relative mx-auto flex h-20 max-w-7xl items-center gap-4 px-4 sm:h-[100px] sm:gap-6 sm:px-6 lg:px-8">
        {/* The whole brand block returns to the home page. */}
        <Link
          to="/"
          aria-label="SxC International Summit, back to home"
          className="flex min-w-0 items-center gap-4 rounded-xl transition-opacity hover:opacity-90 focus-visible:ring-4 focus-visible:ring-[#0262F4]/30 focus-visible:outline-none sm:gap-6"
        >
          <img
            src={logo}
            alt=""
            className="h-14 w-auto shrink-0 object-contain sm:h-[76px]"
          />
          <span className="h-10 w-px shrink-0 bg-[#C3D6F2] sm:h-12" aria-hidden="true" />
          <span className="block leading-tight">
            <span className="block text-base font-normal text-[#1A6FE8] sm:text-[20px]">
              International Summit 2026
            </span>
            <span className="mt-1 flex items-center gap-2 text-xs text-[#2D8CFF] sm:text-[14px]">
              {TAGLINE.map((word, i) => (
                <Fragment key={word}>
                  {i > 0 && <span className="h-1 w-1 rounded-full bg-[#2D8CFF]" aria-hidden="true" />}
                  {word}
                </Fragment>
              ))}
            </span>
          </span>
        </Link>
      </div>
    </header>
  )
}
