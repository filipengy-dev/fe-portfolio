import { useLang } from '../i18n/LanguageContext.jsx'
import Reveal from './Reveal.jsx'

export default function Stats() {
  const { t } = useLang()
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="stats-grid">
          {t.stats.map((s, i) => (
            <Reveal className="stat" key={i} delay={i * 0.08}>
              <div className="stat-num grad-text">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
