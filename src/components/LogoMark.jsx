// Značka: nůžky stříhající filmový pás — v brandu webu (tmavý badge, oranžovo-zlatý gradient).
export default function LogoMark({ className = 'logo-mark' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" role="img" aria-label="Filip Engelhart">
      <defs>
        <linearGradient id="fe-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff7a18" />
          <stop offset="1" stopColor="#f5c451" />
        </linearGradient>
      </defs>

      {/* podklad + gradientový rámeček */}
      <rect x="1" y="1" width="46" height="46" rx="12" fill="#0e0e10" />
      <rect
        x="1.75"
        y="1.75"
        width="44.5"
        height="44.5"
        rx="11.25"
        fill="none"
        stroke="url(#fe-grad)"
        strokeWidth="1.5"
        opacity="0.55"
      />

      {/* filmový pás */}
      <g stroke="url(#fe-grad)" strokeWidth="1.5" strokeLinecap="round">
        <line x1="7" y1="26.5" x2="41" y2="26.5" />
        <line x1="7" y1="37.5" x2="41" y2="37.5" />
      </g>
      <g fill="url(#fe-grad)" opacity="0.82">
        <rect x="8.4" y="28.4" width="9" height="7.2" rx="1.4" />
        <rect x="19.5" y="28.4" width="9" height="7.2" rx="1.4" />
        <rect x="30.6" y="28.4" width="9" height="7.2" rx="1.4" />
      </g>

      {/* nůžky — tmavá aura pro odečtení přes pás, pak gradient */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19.8 15.8 L24 23 L31 34" stroke="#0e0e10" strokeWidth="3.6" />
        <path d="M28.2 15.8 L24 23 L17 34" stroke="#0e0e10" strokeWidth="3.6" />
        <path d="M19.8 15.8 L24 23 L31 34" stroke="url(#fe-grad)" strokeWidth="1.8" />
        <path d="M28.2 15.8 L24 23 L17 34" stroke="url(#fe-grad)" strokeWidth="1.8" />
      </g>

      {/* rukojeti + čep */}
      <g fill="#0e0e10" stroke="url(#fe-grad)" strokeWidth="1.8">
        <circle cx="17.5" cy="13.5" r="3.3" />
        <circle cx="30.5" cy="13.5" r="3.3" />
      </g>
      <circle cx="24" cy="23" r="1.5" fill="#f5c451" />
    </svg>
  )
}
