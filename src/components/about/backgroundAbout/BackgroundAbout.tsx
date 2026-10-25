import HeroDecoration from './HeroDecoration'
import GeometricDecoration from './GeometricDecoration'

export default function BackgroundAbout() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base Global Gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#1c5dfd_0%,#0062ff_30%,#0057ff_100%)] opacity-80" />

      {/* Layered decorative components */}
      <HeroDecoration />
      <GeometricDecoration />
    </div>
  )
}
