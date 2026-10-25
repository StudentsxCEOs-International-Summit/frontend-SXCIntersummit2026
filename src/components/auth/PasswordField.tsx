import { useState } from 'react'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { FormField } from '@/components/ui'

interface PasswordFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  placeholder?: string
  autoComplete?: string
}

export default function PasswordField({
  id,
  label,
  value,
  onChange,
  error,
  placeholder = 'Enter your password',
  autoComplete = 'new-password',
}: PasswordFieldProps) {
  const [show, setShow] = useState(false)

  return (
    <FormField
      id={id}
      label={label}
      icon={<Lock className="h-4 w-4" />}
      type={show ? 'text' : 'password'}
      placeholder={placeholder}
      autoComplete={autoComplete}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      error={error}
      rightElement={
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="text-brand-blue-muted cursor-pointer transition hover:text-brand-blue-700"
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      }
    />
  )
}
