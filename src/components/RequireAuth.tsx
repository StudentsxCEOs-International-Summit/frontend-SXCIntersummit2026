import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

/** Sends signed-out visitors to /login and brings them back afterwards. */
export default function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading, sessionExpired } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F6FAFF]" role="status">
        <span className="h-10 w-10 animate-spin rounded-full border-4 border-[#0262F4]/20 border-t-[#0262F4]" />
        <span className="sr-only">Loading…</span>
      </div>
    )
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname + location.search,
          notice: sessionExpired ? 'Your session has expired. Please log in again.' : undefined,
        }}
      />
    )
  }

  return <>{children}</>
}
