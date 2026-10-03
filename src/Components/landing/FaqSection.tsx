import { useState } from 'react'
import { faqs } from '@/data/landing'
import { SectionTitle } from './ui'

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="w-full mx-auto max-w-[1200px] scroll-mt-28 px-4 sm:px-6">
      <SectionTitle className="bg-[linear-gradient(100deg,#FFFFFF_0%,#0262F4_85%,#003F9E_100%)]">Frequently Asked Questions</SectionTitle>
      <ul className="mt-12 flex flex-col gap-5">
        {faqs.map((faq, i) => {
          const open = openIndex === i
          return (
            <li
              key={faq.question}
              className="overflow-hidden rounded-md border border-blue-soft bg-white shadow-ds-md"
            >
              <h3>
                <button
                  type="button"
                  id={`faq-q-${i}`}
                  aria-expanded={open}
                  aria-controls={`faq-a-${i}`}
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left font-heading text-base font-medium text-primary sm:text-lg"
                >
                  {faq.question}
                  <svg
                    className={`h-7 w-7 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              </h3>
              <div
                id={`faq-a-${i}`}
                role="region"
                aria-labelledby={`faq-q-${i}`}
                className={`grid transition-[grid-template-rows] duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 font-body text-sm text-ds-black/80 sm:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default FaqSection
