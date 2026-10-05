import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon: ReactNode
  error?: string
  rightElement?: ReactNode
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, icon, error, rightElement, id, className, ...inputProps }, ref) => {
    const errorId = error ? `${id}-error` : undefined

    return (
      <div>
        <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-brand-blue-900">
          {label}
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-brand-blue-muted">
            {icon}
          </span>
          <input
            ref={ref}
            id={id}
            aria-invalid={Boolean(error)}
            aria-describedby={errorId}
            className={`w-full rounded-lg border bg-brand-blue-surface py-2 pl-10 pr-10 text-sm text-brand-blue-900 outline-none transition placeholder:text-brand-blue-muted focus:ring-2 focus:ring-primary/20 ${
              error
                ? 'border-red-400 focus:border-red-400'
                : 'border-brand-blue-border focus:border-primary'
            } ${className ?? ''}`}
            {...inputProps}
          />
          {rightElement && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</span>
          )}
        </div>
        {error && (
          <p id={errorId} className="mt-1.5 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    )
  },
)

FormField.displayName = 'FormField'
