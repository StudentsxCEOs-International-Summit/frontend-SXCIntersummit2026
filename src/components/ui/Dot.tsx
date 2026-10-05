interface DotProps {
  size?: number
  className?: string
}

export function Dot({ size = 6, className }: DotProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 6 6"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="3" cy="3" r="3" fill="currentColor" />
    </svg>
  )
}
