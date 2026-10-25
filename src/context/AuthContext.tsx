import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { setUnauthorizedHandler } from '@/lib/api'
import { authService, type AuthUser } from '@/services/auth'

interface AuthContextValue {
  user: AuthUser | null
  /** True until the first GET /auth/me has answered, so guards don't redirect too early. */
  loading: boolean
  /** True when the user was signed out because an API call came back 401 (JWT expired). */
  sessionExpired: boolean
  setUser: (user: AuthUser | null) => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [sessionExpired, setSessionExpired] = useState(false)

  // Lets the 401 handler below know whether someone is actually signed in right now.
  const userRef = useRef<AuthUser | null>(null)
  useEffect(() => {
    userRef.current = user
  }, [user])

  // Restore the session from the httpOnly cookie on first load.
  useEffect(() => {
    let cancelled = false
    authService
      .me()
      .then(({ user }) => {
        if (!cancelled) setUser(user)
      })
      .catch(() => {
        if (!cancelled) setUser(null)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  // The cookie outlives the JWT (24h vs 1h), so a call can fail with 401 while the UI still
  // thinks we're signed in. When that happens, clear the user and remember why; RequireAuth
  // then redirects to /login and passes the "session expired" notice along.
  useEffect(() => {
    setUnauthorizedHandler(() => {
      if (!userRef.current) return
      userRef.current = null
      setSessionExpired(true)
      setUser(null)
    })
    return () => setUnauthorizedHandler(null)
  }, [])

  // A new sign-in clears the flag.
  useEffect(() => {
    if (user) setSessionExpired(false)
  }, [user])

  const logout = useCallback(async () => {
    try {
      await authService.logout()
    } catch {
      // Even if the server call fails, drop the local session so the UI signs out.
    }
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, loading, sessionExpired, setUser, logout }),
    [user, loading, sessionExpired, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>')
  return context
}
