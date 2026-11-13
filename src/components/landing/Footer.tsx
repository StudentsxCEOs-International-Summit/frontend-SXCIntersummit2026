import { Link } from 'react-router-dom'
import town from '@/assets/landing/img-town.webp'

import buildings from '@/assets/landing/img-footer-buildings.webp'
import summitLogo from '@/assets/ic-icon-internasional.svg'
import instagram from '@/assets/ic-instagram.svg'
import linkedin from '@/assets/ic-linkedin.svg'
import tiktok from '@/assets/ic-tiktok.svg'
import { socials } from '@/data/landing'

const footerEvents = [
  'Business Masterclass',
  'Chambers',
  'Summit Visit',
  'International Conference',
]

const footerCompetitions = [
  'Business Model Canvas (BMC)',
  'International Business Case Competition (IBCC)',
]

function FooterLinks({ title, items, href }: { title: string; items: string[]; href: string }) {
  return (
    <div>
      <h3 className="font-heading text-base font-bold text-white sm:text-lg">{title}</h3>
      <ul className="mt-2 flex flex-col gap-1.5 sm:mt-3 sm:gap-2">
        {items.map((item) => (
          <li key={item}>
            <a
              href={href}
              className="font-heading text-xs text-white/95 hover:underline sm:text-base"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden">
      {/* Skyline tiles horizontally at a fixed height so it doesn't grow with screen width. */}
      <div
        className="pointer-events-none h-[110px] w-full bg-repeat-x bg-bottom [background-size:auto_100%] sm:h-[150px] lg:h-[180px]"
        style={{ backgroundImage: `url(${town})` }}
        aria-hidden="true"
      />

      {/* Gradient border wrapper */}
      <div className="relative -mt-7 sm:-mt-8 pt-1 px-1 rounded-t-[28px] sm:rounded-t-[36px] bg-[linear-gradient(90deg,#003F9E_0%,#0262F4_65%,#FFFFFF_110%)]">
        {/* Inner container */}
        <div className="relative overflow-hidden rounded-t-[26px] sm:rounded-t-[34px] w-full h-full">
          <img src={buildings} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgb(62_136_245/0.88)_0%,rgb(134_177_238/0.85)_100%)]" />

          <div className="relative mx-auto grid max-w-[1300px] grid-cols-2 gap-x-4 gap-y-5 px-5 py-7 sm:gap-x-5 sm:gap-y-7 sm:px-12 sm:py-9 md:grid-cols-[1.1fr_1fr_1.2fr] md:gap-8">
            <div className="col-span-2 md:col-span-1">
              <img
                src={summitLogo}
                alt="StudentsxCEOs International Summit"
                className="h-12 w-auto sm:h-14"
              />
              <p className="mt-3 max-w-sm font-heading text-sm text-white sm:mt-4 sm:text-base">
                StudentsxCEOs Intersummit brings students together worldwide to learn, collaborate,
                and get inspired
              </p>
              <div className="mt-5 flex gap-4">
                {[
                  { icon: instagram, label: 'Instagram', href: socials.instagram },
                  { icon: linkedin, label: 'LinkedIn', href: socials.linkedin },
                  { icon: tiktok, label: 'TikTok', href: socials.tiktok },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-transform hover:scale-110"
                  >
                    <img src={s.icon} alt="" className="h-8 w-8 sm:h-9 sm:w-9" />
                  </a>
                ))}
              </div>
            </div>
            <FooterLinks title="Events" items={footerEvents} href="#events" />
            <FooterLinks title="Competition" items={footerCompetitions} href="#competitions" />
          </div>

          {/* Legal links */}
          <div className="relative border-t border-white/20 mx-6 sm:mx-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} StudentsxCEOs International Summit. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                to="/privacy-policy"
                className="text-white/70 hover:text-white transition-colors font-medium"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-white/70 hover:text-white transition-colors font-medium"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
