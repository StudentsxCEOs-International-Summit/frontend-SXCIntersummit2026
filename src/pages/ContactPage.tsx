import { useState, type FormEvent } from 'react'
import { Mail } from 'lucide-react'
import instagramIcon from '@/assets/ic-instagram.svg'
import linkedinIcon from '@/assets/ic-linkedin.svg'
import tiktokIcon from '@/assets/ic-tiktok.svg'
import { usePageTitle } from '@/hooks/usePageTitle'
import building from '@/assets/ic-buildingus.webp'
import diamonds from '@/assets/ic-diamonds.svg'
import starGlow from '@/assets/ic-star-glow.svg'
import Footer from '@/components/landing/Footer'
import { SectionTitle } from '@/components/landing/ui'
import { OutlinedText } from '@/components/about/AboutShared'
import { contactEmail, generalContactPersons, socials } from '@/data/landing'
import { ApiError } from '@/lib/api'
import { CONTACT_TYPES, contactService, type ContactType } from '@/services/contact'

const partnerships = [
  {
    title: 'Sponsorship',
    text: 'Put your brand in front of university students and young professionals across Indonesia.',
  },
  {
    title: 'Media Partner',
    text: 'Help us spread the word about IBCC and the International Summit to your audience.',
  },
  {
    title: 'Community Partner',
    text: 'Bring your student community into the competition, events and networking.',
  },
  {
    title: 'Case Collaborator',
    text: 'Work with us on a real business case for the participants to solve.',
  },
]

const glassCard =
  'bg-glass-blue rounded-2xl border-2 border-white/70 shadow-[0_10px_28px_rgba(0,40,130,0.3)]'

const field =
  'w-full rounded-xl border border-white/50 bg-white/15 px-3.5 py-2.5 text-sm font-medium text-white placeholder:text-white/55 transition focus:border-white focus:bg-white/25 focus:ring-4 focus:ring-white/25 focus:outline-none [&>option]:text-slate-800'

/** WhatsApp logo (white glyph on the brand green) so the contact rows read as real chat links. */
function WhatsAppBadge({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`${className} inline-flex shrink-0 items-center justify-center rounded-full bg-[#25D366] shadow-[0_2px_8px_rgba(0,0,0,0.25)]`}
    >
      <svg viewBox="0 0 14 16" className="h-[55%] w-[55%]" fill="#fff">
        <path d="M11.9031 3.03437C10.5938 1.72187 8.85 1 6.99687 1C3.17187 1 0.059375 4.1125 0.059375 7.9375C0.059375 9.15938 0.378125 10.3531 0.984375 11.4062L0 15L3.67812 14.0344C4.69063 14.5875 5.83125 14.8781 6.99375 14.8781H6.99687C10.8188 14.8781 14 11.7656 14 7.94063C14 6.0875 13.2125 4.34687 11.9031 3.03437ZM6.99687 13.7094C5.95937 13.7094 4.94375 13.4312 4.05937 12.9062L3.85 12.7812L1.66875 13.3531L2.25 11.225L2.1125 11.0063C1.53437 10.0875 1.23125 9.02812 1.23125 7.9375C1.23125 4.75938 3.81875 2.17188 7 2.17188C8.54062 2.17188 9.9875 2.77187 11.075 3.8625C12.1625 4.95312 12.8313 6.4 12.8281 7.94063C12.8281 11.1219 10.175 13.7094 6.99687 13.7094ZM10.1594 9.39062C9.9875 9.30313 9.13438 8.88438 8.975 8.82812C8.81563 8.76875 8.7 8.74062 8.58438 8.91562C8.46875 9.09062 8.1375 9.47813 8.03438 9.59688C7.93438 9.7125 7.83125 9.72812 7.65938 9.64062C6.64062 9.13125 5.97188 8.73125 5.3 7.57812C5.12188 7.27187 5.47812 7.29375 5.80937 6.63125C5.86562 6.51562 5.8375 6.41563 5.79375 6.32812C5.75 6.24062 5.40313 5.3875 5.25938 5.04063C5.11875 4.70312 4.975 4.75 4.86875 4.74375C4.76875 4.7375 4.65312 4.7375 4.5375 4.7375C4.42188 4.7375 4.23438 4.78125 4.075 4.95312C3.91562 5.12813 3.46875 5.54688 3.46875 6.4C3.46875 7.25313 4.09063 8.07813 4.175 8.19375C4.2625 8.30938 5.39687 10.0594 7.1375 10.8125C8.2375 11.2875 8.66875 11.3281 9.21875 11.2469C9.55313 11.1969 10.2437 10.8281 10.3875 10.4219C10.5312 10.0156 10.5312 9.66875 10.4875 9.59688C10.4469 9.51875 10.3313 9.475 10.1594 9.39062Z" />
      </svg>
    </span>
  )
}

/** Email badge in the Gmail red, since the address is a Gmail account. */
function EmailBadge({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`${className} inline-flex shrink-0 items-center justify-center rounded-full bg-[#EA4335] text-white shadow-[0_2px_8px_rgba(0,0,0,0.25)]`}
    >
      <Mail className="h-[55%] w-[55%]" strokeWidth={2.25} />
    </span>
  )
}

function toWhatsAppLink(phone: string) {
  return `https://wa.me/${phone.replace(/\D/g, '').replace(/^0/, '62')}`
}

/** Sends the enquiry to the back end, which stores it for the committee to read. */
function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    organization: '',
    email: '',
    type: partnerships[0].title as ContactType,
    message: '',
    website: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const set = (key: keyof typeof form) => (value: string) => setForm((prev) => ({ ...prev, [key]: value }))

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setFieldErrors({})
    setStatus('sending')
    try {
      await contactService.send({ ...form, type: form.type as ContactType })
      setStatus('sent')
    } catch (err) {
      setStatus('idle')
      if (err instanceof ApiError) {
        setError(err.message)
        setFieldErrors(err.fieldErrors)
      } else {
        setError('Something went wrong. Please try again.')
      }
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className={`${glassCard} rounded-3xl p-7 text-center`}>
        <h3 className="font-heading text-xl font-extrabold text-orange-light">Thank you!</h3>
        <p className="mt-2 text-sm text-white/90">
          We received your message and will get back to you at <strong>{form.email}</strong>.
        </p>
      </div>
    )
  }

  const errorOf = (key: string) =>
    fieldErrors[key] && (
      <span role="alert" className="mt-1 block text-xs font-semibold text-[#ffd6d6]">
        {fieldErrors[key]}
      </span>
    )

  return (
    <form onSubmit={submit} noValidate className={`${glassCard} rounded-3xl p-5 sm:p-7`}>
      <h3 className="font-heading text-xl font-extrabold text-orange-light">Send us a message</h3>
      <p className="mt-1 text-sm text-white/85">Tell us how you would like to work with us.</p>

      {error && (
        <p role="alert" className="mt-4 rounded-xl border border-red-200/70 bg-red-500/25 px-4 py-3 text-sm font-medium text-white">
          {error}
        </p>
      )}

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-white">
          Your name
          <input required autoComplete="name" className={`${field} mt-1`} value={form.name} onChange={(e) => set('name')(e.target.value)} />
          {errorOf('name')}
        </label>
        <label className="block text-sm font-semibold text-white">
          Organization
          <input required autoComplete="organization" className={`${field} mt-1`} value={form.organization} onChange={(e) => set('organization')(e.target.value)} />
          {errorOf('organization')}
        </label>
        <label className="block text-sm font-semibold text-white">
          Your email
          <input required type="email" autoComplete="email" className={`${field} mt-1`} value={form.email} onChange={(e) => set('email')(e.target.value)} />
          {errorOf('email')}
        </label>
        <label className="block text-sm font-semibold text-white">
          Interested in
          <select className={`${field} mt-1`} value={form.type} onChange={(e) => set('type')(e.target.value)}>
            {CONTACT_TYPES.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
          {errorOf('type')}
        </label>
      </div>
      <label className="mt-4 block text-sm font-semibold text-white">
        Message
        <textarea
          required
          rows={4}
          className={`${field} mt-1`}
          value={form.message}
          onChange={(e) => set('message')(e.target.value)}
        />
        {errorOf('message')}
      </label>

      {/* Honeypot: hidden from people, tempting for bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set('website')(e.target.value)} />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="bg-gold-gloss text-outline-sm font-heading mt-5 inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-full border-2 border-white/90 px-8 text-sm font-bold shadow-[0_4px_16px_rgb(245_158_11/0.45)] transition-transform duration-200 hover:scale-[1.02] focus-visible:ring-4 focus-visible:ring-[#f4a300]/40 focus-visible:outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}

function ContactPage() {
  usePageTitle('Contact')

  return (
    <div className="bg-landing relative overflow-hidden">
      <section className="relative flex min-h-[62svh] items-center justify-center px-4 pt-32 pb-16 sm:min-h-[70vh] sm:pt-44">
        <img
          src={building}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full scale-115 origin-center object-cover select-none [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(214_226_255/0.55)_0%,rgb(92_130_245/0.45)_40%,rgb(92_130_245/0)_100%)] [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]" />
        <img src={diamonds} alt="" aria-hidden="true" className="animate-sway pointer-events-none absolute top-16 -left-12 w-44 rotate-225 select-none sm:-top-4 sm:-left-28 sm:w-96" />
        <img src={diamonds} alt="" aria-hidden="true" className="animate-sway-slow pointer-events-none absolute top-[70%] -right-12 w-40 rotate-45 select-none sm:top-[45%] sm:-right-24 sm:w-96" />
        <img src={starGlow} alt="" aria-hidden="true" className="animate-twinkle pointer-events-none absolute -bottom-6 -left-10 w-40 -rotate-12 select-none sm:-bottom-10 sm:-left-24 sm:w-72" />

        <div className="relative z-10 text-center">
          <h1 className="select-none">
            <OutlinedText stroke={10} className="font-heading text-5xl font-extrabold tracking-tight italic md:text-7xl">
              Contact
            </OutlinedText>
          </h1>
          <p className="font-body mx-auto mt-6 max-w-xl text-sm text-white sm:text-base">
            Want to work with StudentsxCEOs International Summit? Tell us how you would like to
            collaborate and we will get back to you.
          </p>
        </div>
      </section>

      <div className="relative mx-auto flex w-full max-w-[1100px] flex-col gap-16 px-4 pb-24 sm:px-6">
        <section aria-labelledby="partner-title">
          <SectionTitle id="partner-title" className="bg-[linear-gradient(100deg,#FFFFFF_0%,#0262F4_85%,#003F9E_100%)]">
            Ways to Collaborate
          </SectionTitle>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {partnerships.map((p, i) => (
              <li key={p.title} className={`${glassCard} flex items-start gap-4 p-5`}>
                <span className="bg-gold-gloss flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white/90 font-heading text-sm font-extrabold text-brand-blue-700 shadow-[0_3px_8px_rgba(244,163,0,0.45)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-bold text-white">{p.title}</h3>
                  <p className="font-body mt-1 text-sm text-white/90">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="reach-title">
          <SectionTitle id="reach-title" className="bg-[linear-gradient(100deg,#FFFFFF_0%,#0262F4_85%,#003F9E_100%)]">
            Get in Touch
          </SectionTitle>
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <ContactForm />

            <div className="grid content-start gap-4">
              {contactEmail && (
                <a
                  href={`mailto:${contactEmail}`}
                  className={`${glassCard} flex items-center gap-3 p-5 transition hover:brightness-105 focus-visible:ring-4 focus-visible:ring-white/60 focus-visible:outline-none`}
                >
                  <EmailBadge className="h-8 w-8" />
                  <div className="min-w-0">
                    <p className="font-heading text-sm font-semibold text-orange-light">Email</p>
                    <p className="font-heading mt-1 text-base font-bold break-all text-white">{contactEmail}</p>
                  </div>
                </a>
              )}

              <div className={`${glassCard} p-5`}>
                <div className="flex items-center gap-2.5">
                  <WhatsAppBadge className="h-8 w-8" />
                  <p className="font-heading text-sm font-semibold text-orange-light">WhatsApp</p>
                </div>
                <ul className="mt-3 grid gap-2">
                  {generalContactPersons.map((cp, i) => (
                    <li key={i}>
                      <a
                        href={toWhatsAppLink(cp.phone)}
                        target="_blank"
                        rel="noreferrer"
                        className="font-heading flex items-center justify-between gap-3 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/25 focus-visible:ring-4 focus-visible:ring-white/60 focus-visible:outline-none"
                      >
                        <span>{cp.name}</span>
                        <span className="font-body font-medium text-white/90">{cp.phone}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`${glassCard} p-5`}>
                <p className="font-heading text-sm font-semibold text-orange-light">Follow us</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {[
                    { label: 'Instagram', icon: instagramIcon, href: socials.instagram },
                    { label: 'LinkedIn', icon: linkedinIcon, href: socials.linkedin },
                    { label: 'TikTok', icon: tiktokIcon, href: socials.tiktok },
                  ].map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="font-heading inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/15 py-1.5 pr-4 pl-2.5 text-sm font-bold text-white transition hover:bg-white/25 focus-visible:ring-4 focus-visible:ring-white/60 focus-visible:outline-none"
                      >
                        <img src={s.icon} alt="" aria-hidden="true" className="h-6 w-6" />
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}

export default ContactPage
