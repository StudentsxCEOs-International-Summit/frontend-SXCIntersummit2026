export function GradientOrb({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 289 289" fill="none" aria-hidden="true">
      <circle cx="144.5" cy="144.5" r="144.5" fill="url(#orbBlueGradient)" fillOpacity="0.4" />
      <defs>
        <linearGradient
          id="orbBlueGradient"
          x1="78.608"
          y1="52.02"
          x2="158"
          y2="145"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C6DBF6" stopOpacity="0.2" />
          <stop offset="1" stopColor="#1664DC" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function CurveBackground({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 987 1024"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0.109551 531.515C-3.37189 278.442 76.9913 71.7245 117.608 0H987V1024H117.608C79.8925 965.285 3.59099 784.587 0.109551 531.515Z"
        fill="white"
      />
    </svg>
  )
}

export function PanelBackground() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 902 1024"
      preserveAspectRatio="xMidYMax slice"
      fill="none"
      aria-hidden="true"
    >
      <rect width="902" height="1024" fill="url(#panelBg)" />
      <circle cx="1013" cy="143" r="280" fill="white" fillOpacity="0.12" />
      <rect
        x="178.839"
        y="-44"
        width="74.9923"
        height="462.358"
        transform="rotate(36.318 178.839 -44)"
        fill="url(#panelBar1)"
        fillOpacity="0.12"
      />
      <rect
        x="8.0791"
        y="900.35"
        width="105.38"
        height="109.684"
        transform="rotate(36.318 8.0791 900.35)"
        fill="url(#panelGold)"
      />
      <rect
        x="143.666"
        y="728.966"
        width="74.9923"
        height="268.621"
        transform="rotate(131.599 143.666 728.966)"
        fill="url(#panelBar2)"
        fillOpacity="0.12"
      />
      <rect
        x="-17.6606"
        y="974.157"
        width="110.916"
        height="109.752"
        transform="rotate(-15.2406 -17.6606 974.157)"
        fill="url(#panelBar3)"
        fillOpacity="0.2"
      />
      <rect
        x="56.8389"
        y="-65"
        width="74.9923"
        height="203.002"
        transform="rotate(36.318 56.8389 -65)"
        fill="url(#panelBar4)"
        fillOpacity="0.12"
      />
      <path
        d="M654.12 852.702C663.209 840.547 681.994 842.548 688.319 856.345L804.65 1110.13C811.111 1124.22 799.77 1139.99 784.351 1138.35L500.84 1108.15C485.422 1106.51 477.656 1088.7 486.941 1076.28L654.12 852.702Z"
        fill="url(#panelStreak)"
        fillOpacity="0.12"
      />
      <g filter="url(#panelBlur)" transform="translate(30, 35)">
        <path
          d="M786.699 453C737.041 569.617 620.988 668.503 570 702.257L609.349 754C634.289 736.752 791.871 575.217 846 500.848L786.699 453Z"
          fill="url(#panelBlurShape)"
          fillOpacity="0.12"
        />
      </g>
      <defs>
        <filter
          id="panelBlur"
          x="560"
          y="443"
          width="296"
          height="321"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur" />
        </filter>
        <linearGradient id="panelBg" x1="0" y1="0" x2="902" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0347D8" />
          <stop offset="1" stopColor="#61A1FD" />
        </linearGradient>
        <linearGradient
          id="panelBar1"
          x1="216.335"
          y1="-44"
          x2="216.335"
          y2="418.358"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="panelGold"
          x1="18.9543"
          y1="932.405"
          x2="115.581"
          y2="982.918"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CDB17C" />
          <stop offset="0.5" stopColor="#F3AC3D" />
          <stop offset="1" stopColor="#FAC45F" />
        </linearGradient>
        <linearGradient
          id="panelBar2"
          x1="181.162"
          y1="728.966"
          x2="181.162"
          y2="997.587"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="panelBar3"
          x1="37.7975"
          y1="974.157"
          x2="37.7975"
          y2="1083.91"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="panelBar4"
          x1="94.335"
          y1="-65"
          x2="94.335"
          y2="138.002"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="panelStreak"
          x1="760"
          y1="1007.5"
          x2="609"
          y2="956.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="panelBlurShape"
          x1="702.735"
          y1="430.745"
          x2="702.735"
          y2="749.549"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
      </defs>
    </svg>
  )
}
