import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const prefersReducedMotion = () =>
  typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Resets the scroll position when the route changes so each page starts at the top, and jumps
 * straight to a /#section target when arriving from another page. A hash change on the page we
 * are already on (the "Scroll More" arrows, in-page links) scrolls smoothly instead of jumping.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const previousPath = useRef<string | null>(null)

  useEffect(() => {
    const samePage = previousPath.current === pathname
    previousPath.current = pathname

    if (hash) {
      document
        .getElementById(hash.slice(1))
        ?.scrollIntoView({ behavior: samePage && !prefersReducedMotion() ? 'smooth' : 'instant' })
      return
    }
    if (!samePage) window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

export default ScrollToTop
