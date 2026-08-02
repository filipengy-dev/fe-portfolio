import { clients } from '../i18n/translations.js'

export default function Marquee() {
  // dvojnásobný seznam pro plynulou nekonečnou smyčku
  const loop = [...clients, ...clients]
  return (
    <div className="marquee" aria-label="Značky a tvůrci, se kterými jsem spolupracoval">
      <div className="marquee-track">
        {loop.map((c, i) => (
          <span className="marquee-item" key={i}>
            {c.logo ? (
              <img className="marquee-logo" src={c.logo} alt={c.name} loading="lazy" />
            ) : (
              c.name
            )}
          </span>
        ))}
      </div>
    </div>
  )
}
