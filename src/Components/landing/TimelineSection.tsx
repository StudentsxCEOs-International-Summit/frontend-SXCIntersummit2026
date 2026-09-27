import { timeline, type TimelineItem } from '@/data/landing'
import { SectionTitle } from './ui'

function TimelineCard({ item }: { item: TimelineItem }) {
  const tone = item.active
    ? 'bg-[linear-gradient(135deg,#fff6e0_0%,#fbd878_50%,#f4a300_100%)] text-ds-black border-b-[#e89400]'
    : 'bg-[linear-gradient(135deg,#a9c6fb_0%,#6d9ef7_50%,#3e7df3_100%)] text-white border-b-primary'
  const divider = item.active ? 'bg-ds-black/70' : 'bg-white/70'

  return (
    <div
      className={`${tone} w-[250px] rounded-2xl border-2 border-r-4 border-b-4 border-white/90 px-6 py-6 text-center shadow-[0_8px_20px_rgb(10_63_184/0.25)]`}
    >
      <p className="font-body text-sm font-medium">{item.title}</p>
      <div className={`mx-auto my-3 h-px w-full ${divider}`} />
      <p className="font-body text-xs">{item.date}</p>
    </div>
  )
}

function TimelineSection() {
  return (
    <section
      id="timeline"
      className="w-full relative mx-auto max-w-[1200px] scroll-mt-28 px-4 sm:px-6"
    >
      <SectionTitle>Timeline</SectionTitle>

      <div className="mt-12 rounded-[32px] border-2 border-white/70 bg-blue-light/85 shadow-[0_12px_32px_rgb(10_63_184/0.3)]">
        <ol
          className="grid snap-x snap-mandatory auto-cols-[255px] grid-flow-col grid-rows-[auto_40px_auto] overflow-x-auto px-6 py-10 [scrollbar-width:thin] sm:px-12"
          aria-label="Event timeline"
        >
          {timeline.map((item, i) => {
            const top = i % 2 === 0
            return (
              <li
                key={i}
                className="row-span-3 grid snap-center grid-rows-subgrid justify-items-center"
              >
                <div className={top ? 'row-start-1 self-end' : 'row-start-3 self-start'}>
                  <TimelineCard item={item} />
                </div>
                <div className="relative row-start-2 flex w-full items-center">
                  <span className="h-1 w-full bg-primary" />
                  <span
                    className={`absolute left-1/2 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-white shadow ${
                      item.active
                        ? 'bg-[radial-gradient(circle_at_35%_35%,#fff6e0,#f4a300)]'
                        : 'bg-[radial-gradient(circle_at_35%_35%,#ffffff,#86b1ee)]'
                    }`}
                    aria-hidden="true"
                  />
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export default TimelineSection
