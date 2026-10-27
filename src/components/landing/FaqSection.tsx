import { useState } from 'react'
import { faqs, type FaqItem } from '@/data/landing'
import { SectionTitle } from './ui'

export interface FaqSectionProps {
  items?: FaqItem[]
}

/**
 * Glass cards that match the rest of the site. A closed question is a blue glass pill; the open
 * one turns into a light card with a gold accent, so the page has movement instead of a stack of
 * identical white boxes.
 */
function FaqSection({ items = faqs }: FaqSectionProps = {}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="w-full mx-auto max-w-[1200px] scroll-mt-28 px-4 sm:px-6">
      <SectionTitle className="bg-[linear-gradient(100deg,#FFFFFF_0%,#0262F4_85%,#003F9E_100%)]">Frequently Asked Questions</SectionTitle>
      <ul className="mx-auto mt-8 flex max-w-[960px] flex-col gap-3 sm:gap-4">
        {items.map((faq, i) => {
          const open = openIndex === i
          return (
            <li
              key={faq.question}
              className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                open
                  ? 'border-white bg-[linear-gradient(180deg,#ffffff_0%,#d6e6fb_100%)] shadow-[0_12px_30px_rgba(0,40,130,0.4)]'
                  : 'bg-glass-blue border-white/60 shadow-[0_8px_20px_rgba(0,40,130,0.28)] hover:-translate-y-0.5 hover:border-white/90 hover:brightness-105'
              }`}
            >
              {/* Gold accent bar on the open card */}
              <span
                aria-hidden="true"
                className={`bg-gold-gloss absolute inset-y-0 left-0 w-1.5 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
              />
              <h3>
                <button
                  type="button"
                  id={`faq-q-${i}`}
                  aria-expanded={open}
                  aria-controls={`faq-a-${i}`}
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex w-full cursor-pointer items-center gap-3 px-4 py-3.5 text-left focus-visible:ring-4 focus-visible:ring-white/60 focus-visible:outline-none sm:gap-4 sm:px-5 sm:py-4"
                >
                  <span
                    aria-hidden="true"
                    className="bg-gold-gloss flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-white/90 font-heading text-xs font-extrabold text-brand-blue-700 shadow-[0_3px_8px_rgba(244,163,0,0.45)] sm:h-10 sm:w-10 sm:text-sm"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`min-w-0 flex-1 font-heading text-sm font-semibold transition-colors duration-300 sm:text-base ${
                      open ? 'text-[#0b3d91]' : 'text-white'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      open
                        ? 'rotate-45 border-transparent bg-primary text-white shadow-[0_3px_8px_rgba(2,98,244,0.45)]'
                        : 'border-white/70 bg-white/15 text-white group-hover:bg-white/25'
                    }`}
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.75}
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
              </h3>
              <div
                id={`faq-a-${i}`}
                role="region"
                aria-labelledby={`faq-q-${i}`}
                className={`grid transition-[grid-template-rows] duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              >
                <div className="overflow-hidden">
                  <p className="px-4 pb-5 pl-[3.75rem] font-body text-xs leading-relaxed text-[#1a2340] sm:px-5 sm:pb-5 sm:pl-[4.75rem] sm:text-sm">
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
