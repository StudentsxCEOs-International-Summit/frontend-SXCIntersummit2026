import { useEffect } from 'react'

const SITE_NAME = 'SxC International Summit'

/**
 * Mengatur judul tab browser untuk halaman ini.
 * Contoh: usePageTitle('Team Leader Registration')
 *   -> "Team Leader Registration | SxC International Summit"
 * Saat halaman ditinggalkan, judul dikembalikan seperti semula.
 */
export function usePageTitle(title: string) {
  useEffect(() => {
    const previous = document.title
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME

    return () => {
      document.title = previous
    }
  }, [title])
}
