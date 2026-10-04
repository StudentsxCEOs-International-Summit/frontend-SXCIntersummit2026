import type { ReactNode } from 'react'

interface SectionHeaderProps {
  icon: string
  title: string
  description: string
  badge?: ReactNode
}

export default function SectionHeader({ icon, title, description, badge }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <img src={icon} alt="" className="h-10 w-10 shrink-0 object-contain" />
        <div>
          <h2 className="text-lg leading-tight text-[#334FA2]">{title}</h2>
          <p className="text-[13px] text-[#667085]">{description}</p>
        </div>
      </div>
      {badge}
    </div>
  )
}
