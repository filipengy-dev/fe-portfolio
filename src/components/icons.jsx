// Jednotná sada SVG ikon (stroke 1.6, zaoblené) — žádné emoji.
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const Arrow = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const Play = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
)

export const Check = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

export const Scissors = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12" />
  </svg>
)

export const Phone = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

export const Mail = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </svg>
)

export const Instagram = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
  </svg>
)

export const Close = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
)

export const Search = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
)

export const ArrowUp = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
)

export const Sparkle = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.4 2.4M15.3 15.3l2.4 2.4M17.7 6.3l-2.4 2.4M8.7 15.3l-2.4 2.4" />
  </svg>
)

// AI — čip / procesor se "sparkle" jiskrou
export const Ai = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <rect x="7" y="7" width="10" height="10" rx="2.5" />
    <path d="M9.5 2v3M14.5 2v3M9.5 19v3M14.5 19v3M2 9.5h3M2 14.5h3M19 9.5h3M19 14.5h3" />
    <path d="M12 10.2l.7 1.6 1.6.7-1.6.7-.7 1.6-.7-1.6-1.6-.7 1.6-.7z" fill="currentColor" stroke="none" />
  </svg>
)
