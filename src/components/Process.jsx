import { useLang } from '../i18n/LanguageContext.jsx'
import Reveal from './Reveal.jsx'
import { Arrow } from './icons.jsx'

export default function Process() {
  const { t } = useLang()
  const p = t.process
  return (
    <section className="section" id="process">
      <div className="container">
        <div className="section-head center">
          <Reveal>
            <span className="eyebrow">{p.eyebrow}</span>
            <h2 className="section-title" style={{ whiteSpace: 'pre-line' }}>
              {p.title}
            </h2>
          </Reveal>
        </div>

        <div className="process-grid">
          {p.steps.map((step, i) => (
            <Reveal className="step" key={i} delay={i * 0.1}>
              <div className="step-num">{String(i + 1).padStart(2, '0')}</div>
              <h3>{step.t}</h3>
              <p>{step.d}</p>
              {i < p.steps.length - 1 && (
                <span className="step-line">
                  <Arrow size={22} />
                </span>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
