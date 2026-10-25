import { Link, useNavigate } from 'react-router-dom'
import building from '@/assets/ic-buildingus.webp'

const gradientText =
  'bg-[linear-gradient(90deg,#003F9E_0%,#0262F4_70%,#4C93FF_110%)] bg-clip-text text-transparent ' +
  '[filter:drop-shadow(0_10px_24px_rgba(2,98,244,0.25))]'

function ArrowRightIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}

function ArrowLeftIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
    </svg>
  )
}

function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <section className="not-found-page relative isolate flex min-h-screen flex-col overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#EEF4FF_100%)] text-[#010a30]">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_40%_at_50%_45%,rgba(2,98,244,0.16)_0%,transparent_70%)]"
      />

      <img
        src={building}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-[55%] w-full select-none object-cover object-bottom opacity-25 [mask-image:linear-gradient(to_top,black_0%,transparent_100%)]"
      />

      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-5 pb-10 pt-32 text-center sm:gap-10 sm:px-10 lg:px-16">
        {/* 404 visual */}
        <div
          aria-hidden="true"
          className="flex select-none items-center justify-center gap-1 text-[clamp(7rem,24vw,16rem)] font-extrabold italic leading-none tracking-[-0.04em] sm:gap-4"
        >
          <span className={gradientText}>4</span>
          <span
            className="relative grid size-[0.78em] place-items-center rounded-full border-[0.08em] border-transparent
              [background:linear-gradient(#FFFFFF,#F3F8FF)_padding-box,linear-gradient(135deg,#003F9E,#0262F4_60%,#7DB2FF)_border-box]
              shadow-[0_18px_50px_rgba(2,98,244,0.28),inset_0_0_30px_rgba(2,98,244,0.12)]
              animate-pulse motion-reduce:animate-none"
          >
            <span className="size-[26%] rounded-full bg-[radial-gradient(circle,#0262F4_0%,#4C93FF_55%,transparent_78%)] blur-[1px]" />
          </span>

          <span className={gradientText}>4</span>
        </div>

        <div className="flex max-w-xl flex-col items-center gap-3">
          <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-extrabold leading-[1.1] tracking-tight">
            Page not found
          </h1>
          <p className="max-w-[30rem] text-base leading-relaxed text-[#010a30]/70 sm:text-lg">
            The page you are looking for does not exist or may have moved to a new address. Check
            the URL, or head back to continue.
          </p>

          <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Link
              to="/"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[linear-gradient(90deg,#003F9E_0%,#0262F4_100%)] px-7 py-3.5 font-semibold text-white shadow-[0_10px_26px_rgba(2,98,244,0.35)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(2,98,244,0.5)] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#0262F4] motion-reduce:transition-none"
            >
              Return to homepage
              <ArrowRightIcon className="size-5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" />
            </Link>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-[#0262F4]/30 bg-white/70 px-7 py-3.5 font-semibold text-[#003F9E] backdrop-blur-sm transition duration-200 hover:bg-[#0262F4]/10 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#0262F4] motion-reduce:transition-none"
            >
              <ArrowLeftIcon className="size-5 transition-transform duration-200 group-hover:-translate-x-1 motion-reduce:transition-none" />
              Go back
            </button>
          </div>
        </div>
      </main>

      <footer className="px-5 pb-8 text-center text-sm text-[#010a30]/60">
        <p className="font-semibold text-[#003F9E]">StudentsxCEOs International Summit 2026</p>
        <p>Foster True Innovation</p>
      </footer>
    </section>
  )
}

export default NotFoundPage
