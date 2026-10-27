import { useState, type FormEvent } from 'react'
import { usePageTitle } from '@/hooks/usePageTitle'
import building from '@/assets/ic-buildingus.webp'
import diamonds from '@/assets/ic-diamonds.svg'
import starGlow from '@/assets/ic-star-glow.svg'
import Footer from '@/components/landing/Footer'
import { SectionTitle } from '@/components/landing/ui'
import { OutlinedText } from '@/components/about/AboutShared'
import { contactEmail, contactPersons, socials } from '@/data/landing'
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
  'w-full rounded-lg border border-[#D8E7F4] bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0262F4] focus:ring-2 focus:ring-[#0262F4]/20 focus:outline-none'

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
      <div role="status" className="rounded-3xl border-2 border-white bg-white p-7 text-center shadow-[0_12px_32px_rgba(0,40,130,0.3)]">
        <h3 className="font-heading text-xl font-extrabold text-[#0b4fd1]">Thank you!</h3>
        <p className="mt-2 text-sm text-slate-600">
          We received your message and will get back to you at <strong>{form.email}</strong>.
        </p>
      </div>
    )
  }

  const errorOf = (key: string) =>
    fieldErrors[key] && (
      <span role="alert" className="mt-1 block text-xs font-medium text-red-600">
        {fieldErrors[key]}
      </span>
    )

  return (
    <form onSubmit={submit} noValidate className="rounded-3xl border-2 border-white bg-white p-5 shadow-[0_12px_32px_rgba(0,40,130,0.3)] sm:p-7">
      <h3 className="font-heading text-xl font-extrabold text-[#0b4fd1]">Send us a message</h3>
      <p className="mt-1 text-sm text-slate-500">Tell us how you would like to work with us.</p>

      {error && (
        <p role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-700">
          Your name
          <input required autoComplete="name" className={`${field} mt-1`} value={form.name} onChange={(e) => set('name')(e.target.value)} />
          {errorOf('name')}
        </label>
        <label className="block text-sm font-semibold text-slate-700">
          Organization
          <input required autoComplete="organization" className={`${field} mt-1`} value={form.organization} onChange={(e) => set('organization')(e.target.value)} />
          {errorOf('organization')}
        </label>
        <label className="block text-sm font-semibold text-slate-700">
          Your email
          <input required type="email" autoComplete="email" className={`${field} mt-1`} value={form.email} onChange={(e) => set('email')(e.target.value)} />
          {errorOf('email')}
        </label>
        <label className="block text-sm font-semibold text-slate-700">
          Interested in
          <select className={`${field} mt-1`} value={form.type} onChange={(e) => set('type')(e.target.value)}>
            {CONTACT_TYPES.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
          {errorOf('type')}
        </label>
      </div>
      <label className="mt-4 block text-sm font-semibold text-slate-700">
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
                  className={`${glassCard} block p-5 transition hover:brightness-105 focus-visible:ring-4 focus-visible:ring-white/60 focus-visible:outline-none`}
                >
                  <p className="font-heading text-sm font-semibold text-orange-light">Email</p>
                  <p className="font-heading mt-1 text-base font-bold break-all text-white">{contactEmail}</p>
                </a>
              )}

              <div className={`${glassCard} p-5`}>
                <p className="font-heading text-sm font-semibold text-orange-light">WhatsApp</p>
                <ul className="mt-2 grid gap-2">
                  {contactPersons.map((cp, i) => (
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
                    { label: 'Instagram', href: socials.instagram },
                    { label: 'LinkedIn', href: socials.linkedin },
                    { label: 'TikTok', href: socials.tiktok },
                  ].map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="font-heading inline-flex rounded-full border border-white/70 bg-white/15 px-4 py-1.5 text-sm font-bold text-white transition hover:bg-white/25 focus-visible:ring-4 focus-visible:ring-white/60 focus-visible:outline-none"
                      >
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
