import { Check, Circle } from 'lucide-react'
import type { PasswordRequirement } from '@/types/register'

interface PasswordChecklistProps {
  password: string
  requirements: PasswordRequirement[]
}

export function PasswordChecklist({ password, requirements }: PasswordChecklistProps) {
  if (password.length === 0) return null

  return (
    <ul className="mt-2 grid grid-cols-1 gap-x-3 gap-y-1 sm:grid-cols-2">
      {requirements.map((req) => {
        const passed = req.test(password)
        return (
          <li
            key={req.id}
            className={`flex items-center gap-1.5 text-xs ${
              passed ? 'text-emerald-600' : 'text-brand-blue-muted'
            }`}
          >
            <span
              className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full ${
                passed
                  ? 'bg-emerald-100 text-emerald-600'
                  : 'bg-brand-blue-surface text-brand-blue-muted'
              }`}
            >
              {passed ? (
                <Check className="h-2.5 w-2.5" strokeWidth={3} />
              ) : (
                <Circle className="h-3.5 w-3.5" strokeWidth={2} />
              )}
            </span>
            {req.label}
          </li>
        )
      })}
    </ul>
  )
}
