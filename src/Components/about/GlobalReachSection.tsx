import { useEffect, useState } from 'react'
import worldMapUrl from '@/assets/About/ic-WorldMap.svg'
import { AboutPill } from './AboutShared'

/**
 * `ic-WorldMap.svg` is actually PNG data saved with an `.svg` extension, so browsers
 * refuse to decode it when it is served as `image/svg+xml`. We fetch the bytes and
 * re-label them as PNG. (Renaming the file to `.png` would let us drop this hook.)
 */
function usePngObjectUrl(url: string) {
  const [src, setSrc] = useState<string>()

  useEffect(() => {
    let cancelled = false
    let objectUrl: string | undefined

    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        if (cancelled) return
        objectUrl = URL.createObjectURL(new Blob([blob], { type: 'image/png' }))
        setSrc(objectUrl)
      })
      .catch(() => setSrc(url))

    return () => {
      cancelled = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [url])

  return src
}

function GlobalReachSection() {
  const mapSrc = usePngObjectUrl(worldMapUrl)

  return (
    <section
      id="about-global-reach"
      aria-labelledby="about-global-reach-title"
      className="relative mx-auto w-full max-w-[1240px] px-4 sm:px-6"
    >
      <AboutPill id="about-global-reach-title">See Where the Summit Has Reached!</AboutPill>

      {/* Map (includes the institution callouts, flags and logos from Figma) */}
      <div className="relative mx-auto mt-10 aspect-[1191/614] w-full sm:mt-14">
        <div
          aria-hidden="true"
          className="absolute inset-[10%] rounded-full bg-white/20 blur-[90px]"
        />
        {mapSrc && (
          <img
            src={mapSrc}
            alt="World map showing universities from Singapore, Taiwan, Canada, the Philippines and Indonesia that have joined the Summit"
            className="relative h-full w-full object-contain drop-shadow-[0_10px_30px_rgba(0,40,140,0.25)]"
          />
        )}
      </div>
    </section>
  )
}

export default GlobalReachSection
