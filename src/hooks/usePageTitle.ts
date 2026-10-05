import { useEffect } from 'react'

const SITE_NAME = 'SxC International Summit'

export function usePageTitle(title: string) {
  useEffect(() => {
    const previous = document.title
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME

    return () => {
      document.title = previous
    }
  }, [title])
}
