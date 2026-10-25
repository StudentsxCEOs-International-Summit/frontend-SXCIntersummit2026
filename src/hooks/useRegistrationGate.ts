import { useEffect, useState } from 'react'
import { configService } from '@/services/config'
import { ibccService } from '@/services/ibcc'

export type RegistrationGate =
  | { status: 'checking' }
  | { status: 'open' }
  /** The backend's GET /config says registration is closed. */
  | { status: 'closed'; deadline: string | null }
  /** GET /ibcc/my-team found a team, so there is nothing left to register. */
  | { status: 'hasTeam' }

/**
 * Decides what the team-registration page should do before showing the form:
 * send people who already have a team to My Team, and stop everyone else once registration is
 * closed. If either lookup fails (network, server error) the form stays available, because the
 * backend is still the final judge of what it accepts.
 */
export function useRegistrationGate(): RegistrationGate {
  const [gate, setGate] = useState<RegistrationGate>({ status: 'checking' })

  useEffect(() => {
    let cancelled = false

    Promise.allSettled([ibccService.getMyTeam(), configService.get()]).then(([team, config]) => {
      if (cancelled) return

      if (team.status === 'fulfilled') {
        setGate({ status: 'hasTeam' })
      } else if (config.status === 'fulfilled' && config.value.registrationOpen === false) {
        setGate({ status: 'closed', deadline: config.value.deadline ?? null })
      } else {
        setGate({ status: 'open' })
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  return gate
}
