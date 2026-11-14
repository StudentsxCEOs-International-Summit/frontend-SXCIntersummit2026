import { API_BASE_URL } from '@/lib/api'

interface GoogleOAuthButtonProps {
  returnTo: string
}

export default function GoogleOAuthButton({ returnTo }: GoogleOAuthButtonProps) {
  const returnUrl = new URL(returnTo.startsWith('/') ? returnTo : '/', window.location.origin)
  const safeReturnUrl =
    returnUrl.origin === window.location.origin ? returnUrl : new URL('/', window.location.origin)
  const href = `${API_BASE_URL}/auth/google?state=${encodeURIComponent(safeReturnUrl.toString())}`

  return (
    <>
      <div className="relative flex items-center justify-center">
        <div className="flex-grow border-t border-brand-blue-100" />
        <span className="mx-4 shrink-0 text-xs text-brand-blue-muted">or</span>
        <div className="flex-grow border-t border-brand-blue-100" />
      </div>

      <a
        href={href}
        className="inline-flex h-11 w-full items-center justify-center gap-3 rounded-full border border-brand-blue-100 bg-white text-sm font-semibold text-brand-blue-700 transition-colors hover:bg-brand-blue-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue-200"
      >
        <svg aria-hidden="true" viewBox="0 0 48 48" className="h-5 w-5">
          <path
            fill="#4285F4"
            d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11c-.5 2.5-2 4.7-4.2 6.1l6.8 5.3c4-3.7 6.3-9.1 6-15.1Z"
          />
          <path
            fill="#34A853"
            d="M24 44c5.6 0 10.3-1.9 13.7-5.1l-6.8-5.3c-1.9 1.3-4.3 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4l-7.1 5.5C9 39 16 44 24 44Z"
          />
          <path
            fill="#FBBC05"
            d="M12.6 27.2a12 12 0 0 1 0-6.4l-7.1-5.5a20 20 0 0 0 0 17.4l7.1-5.5Z"
          />
          <path
            fill="#EA4335"
            d="M24 12c3.1 0 5.8 1.1 8 3.2l6-6C34.4 5.8 29.7 4 24 4 16 4 9 9 5.5 15.3l7.1 5.5C14.2 15.6 18.7 12 24 12Z"
          />
        </svg>
        Continue with Google
      </a>
    </>
  )
}
