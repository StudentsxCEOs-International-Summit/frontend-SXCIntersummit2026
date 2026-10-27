import { contactPersons } from '@/data/landing'

function toWhatsAppLink(phone: string) {
  const digits = phone.replace(/\D/g, '').replace(/^0/, '62')
  return `https://wa.me/${digits}`
}

function UserIcon() {
  return (
    <svg
      className="h-7 w-7 shrink-0 text-brand-blue-700"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 3.2a3.3 3.3 0 1 1 0 6.6 3.3 3.3 0 0 1 0-6.6Zm0 14.1a8 8 0 0 1-6-2.7c.1-2 4-3.1 6-3.1s5.9 1.1 6 3.1a8 8 0 0 1-6 2.7Z" />
    </svg>
  )
}

function ContactSection() {
  return (
    <section
      id="contact"
      className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-2 px-4 text-center sm:px-6"
    >
      <h2
        className="font-heading text-3xl font-extrabold italic tracking-tight text-white sm:text-4xl"
        style={{ textShadow: '0 2px 0 #003F9E, 0 0 10px rgba(0, 63, 158, 0.6)' }}
      >
        Contact Person IBCC
      </h2>
      <p className="font-body text-xs text-orange-light sm:text-sm">
        Got questions? Just drop us a message!
      </p>
      <ul className="mt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {contactPersons.map((cp, i) => (
          <li key={i}>
            <a
              href={toWhatsAppLink(cp.phone)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-2xl bg-gradient-to-b from-orange-light to-orange-soft px-5 py-2.5 font-heading text-xs font-bold text-brand-blue-700 shadow-md transition hover:brightness-105 sm:text-sm"
            >
              <UserIcon />
              {cp.name} ({cp.phone})
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ContactSection
