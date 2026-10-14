import { contactPersons } from '@/data/landing'

function toWhatsAppLink(phone: string) {
  const digits = phone.replace(/\D/g, '').replace(/^0/, '62')
  return `https://wa.me/${digits}`
}

function WhatsAppIcon() {
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-white text-primary">
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.44 9.44-9.44a9.4 9.4 0 0 1 6.67 2.77 9.38 9.38 0 0 1 2.76 6.68c0 5.2-4.24 9.43-9.44 9.43m8.03-17.47A11.28 11.28 0 0 0 12.05.7C5.79.7.7 5.79.7 12.05c0 2 .52 3.95 1.52 5.67L.6 23.6l6.02-1.58a11.33 11.33 0 0 0 5.42 1.38h.01c6.25 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.33-8.02" />
      </svg>
    </span>
  )
}

function ContactSection() {
  return (
    <section
      id="contact"
      className="w-full mx-auto flex max-w-[1200px] flex-col items-start gap-8 px-4 sm:flex-row sm:items-center sm:gap-14 sm:px-6"
    >
      <h2 className="relative inline-block text-center font-heading">
        <span
          aria-hidden="true"
          className="absolute inset-0 px-5 text-5xl sm:text-6xl leading-[1.15] font-extrabold tracking-tight select-none pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(90deg, #003F9E 0%, #0262F4 65%, #FFFFFF 110%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            WebkitTextStroke: '10px transparent',
            paintOrder: 'stroke fill',
            filter:
              'drop-shadow(0 0 12px rgba(2, 98, 244, 0.5)) drop-shadow(0 4px 10px rgba(0, 63, 158, 0.6))',
          }}
        >
          Contact
          <br />
          Person
        </span>
        <span className="relative block px-5 text-5xl sm:text-6xl leading-[1.15] font-extrabold tracking-tight text-white">
          Contact
          <br />
          Person
        </span>
      </h2>
      <div className="h-px w-full border-t-4 border-dashed border-accent sm:h-40 sm:w-0 sm:border-t-0 sm:border-l-4" />
      <ul className="flex flex-col gap-6">
        {contactPersons.map((cp, i) => (
          <li
            key={i}
            className="flex items-center gap-8 font-heading text-xl font-medium text-white sm:gap-20 sm:text-2xl"
          >
            <span className="w-16">{cp.name}</span>
            <a
              href={toWhatsAppLink(cp.phone)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-6 hover:underline"
            >
              <WhatsAppIcon />
              {cp.phone}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ContactSection
