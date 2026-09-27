import { useEffect } from 'react'

const SITE_NAME = 'SxC International Summit 2026'

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  }, [title])
}
