import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

/** Only staff sessions may enter; everyone else goes to the admin login. */
export default function RequireStaff({ children }: { children: ReactNode }) {
  const { user, loading, sessionExpired } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F4F8FE]" role="status">
        <span className="h-10 w-10 animate-spin rounded-full border-4 border-[#0262F4]/20 border-t-[#0262F4]" />
        <span className="sr-only">Loading…</span>
      </div>
    )
  }

  if (user?.accountType !== 'staff') {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{
          from: location.pathname,
          notice: sessionExpired ? 'Your session has expired. Please log in again.' : undefined,
        }}
      />
    )
  }

  return <>{children}</>
}
