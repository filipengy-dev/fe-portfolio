import { useLang } from '../i18n/LanguageContext.jsx'
import Reveal from './Reveal.jsx'
import { Check } from './icons.jsx'

export default function About() {
  const { t } = useLang()
  const a = t.about
  return (
    <section className="section" id="about">
      <div className="container about-wrap">
        <div className="about-body">
          <Reveal>
            <span className="eyebrow">{a.eyebrow}</span>
            <h2 className="section-title" style={{ whiteSpace: 'pre-line' }}>
              {a.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p dangerouslySetInnerHTML={{ __html: a.p1 }} />
            <p dangerouslySetInnerHTML={{ __html: a.p2 }} />
            <p dangerouslySetInnerHTML={{ __html: a.p3 }} />
            <p dangerouslySetInnerHTML={{ __html: a.p4 }} />
          </Reveal>
          <Reveal delay={0.16}>
            <div className="about-tags">
              {a.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="about-visual">
          <div className="portrait">
            <span className="portrait-glow" aria-hidden="true" />
            <div className="portrait-ring">
              <img src="/photos/filip-portret.jpg" alt="Filip Engelhart" loading="lazy" />
            </div>
            <span className="portrait-badge">
              <span className="pdot" />
              {a.cardBig.replace('\n', ' ')}
            </span>
          </div>

          <div className="about-glass">
            <span className="mono">{a.cardMono}</span>
            <ul>
              {a.cardList.map((item) => (
                <li key={item}>
                  <Check size={16} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
