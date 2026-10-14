import town from '@/assets/landing/town.webp'

import buildings from '@/assets/landing/footer-buildings.webp'
import summitLogo from '@/assets/ic-iconsummit.svg'
import instagram from '@/assets/ic-instagram.svg'
import linkedin from '@/assets/ic-linkedin.svg'
import tiktok from '@/assets/ic-tiktok.svg'
import { socials } from '@/data/landing'

const footerEvents = [
  'Business Competition Launchpad (BCL)',
  'Chambers',
  'Company Visit',
  'International Conference',
]

const footerCompetitions = [
  'Business Model Canvas (BMC)',
  'International Business Case Competition (IBCC)',
  'International Business Plan Competition (IBPC)',
]

function FooterLinks({ title, items, href }: { title: string; items: string[]; href: string }) {
  return (
    <div>
      <h3 className="font-heading text-xl font-bold text-white">{title}</h3>
      <ul className="mt-4 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item}>
            <a
              href={href}
              className="font-heading text-base text-white/95 hover:underline sm:text-lg"
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
    <footer className="relative mt-24 overflow-hidden">
      <div
        className="pointer-events-none relative flex items-end justify-center w-full"
        aria-hidden="true"
      >
        <img src={town} alt="" className="w-1/2 object-cover" />
        <img src={town} alt="" className="w-1/2 object-cover" />
      </div>

      {/* Gradient border wrapper */}
      <div className="relative -mt-3 sm:-mt-24 pt-1 px-1 rounded-t-[36px] bg-[linear-gradient(90deg,#003F9E_0%,#0262F4_65%,#FFFFFF_110%)]">
        {/* Inner container */}
        <div className="relative overflow-hidden rounded-t-[34px] w-full h-full">
          <img src={buildings} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgb(62_136_245/0.88)_0%,rgb(134_177_238/0.85)_100%)]" />

          <div className="relative mx-auto grid max-w-[1300px] gap-10 px-6 py-14 sm:px-12 md:grid-cols-[1.1fr_1fr_1.2fr]">
            <div>
            <img
              src={summitLogo}
              alt="StudentsxCEOs International Summit"
              className="h-20 w-auto"
            />
            <p className="mt-6 max-w-sm font-heading text-lg text-white">
              StudentsxCEOs Intersummit brings students together worldwide to learn, collaborate,
              and get inspired
            </p>
            <div className="mt-8 flex gap-6">
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
                  <img src={s.icon} alt="" className="h-11 w-11" />
                </a>
              ))}
            </div>
          </div>
          <FooterLinks title="Events" items={footerEvents} href="#events" />
          <FooterLinks title="Competition" items={footerCompetitions} href="#competitions" />
        </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
