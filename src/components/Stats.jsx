import { motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext.jsx'
import Reveal from './Reveal.jsx'
import { Search } from './icons.jsx'

// SVG area graf s animovaným kreslením čáry (fialový gradient)
function AreaChart({ id, points, height = 96 }) {
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ')
  const area = `${line} L300,${height} L0,${height} Z`
  return (
    <svg className="mac-chart" viewBox={`0 0 300 ${height}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.4" />
          <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* jemné vodicí linky */}
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1="0" x2="300" y1={height * f} y2={height * f} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      ))}
      <motion.path
        d={area}
        fill={`url(#${id}-fill)`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="#a78bfa"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  )
}

// Statistiky jako macOS okno s analytickým dashboardem.
export default function Stats() {
  const { t } = useLang()
  const d = t.dash

  return (
    <section className="section" style={{ paddingTop: 'clamp(56px, 8vw, 100px)' }}>
      <div className="container">
        <Reveal>
          <div className="macwin">
            {/* titlebar */}
            <div className="mac-titlebar">
              <span className="mac-dots" aria-hidden="true">
                <i className="d-red" />
                <i className="d-yellow" />
                <i className="d-green" />
              </span>
              <span className="mac-title">{d.winTitle}</span>
              <span className="mac-search" aria-hidden="true">
                <Search size={13} />
                Search
              </span>
            </div>

            <div className="mac-body">
              {/* boční menu */}
              <aside className="mac-side" aria-hidden="true">
                {d.side.map((item, i) => (
                  <span key={item} className={`mac-side-item ${i === 0 ? 'active' : ''}`}>
                    <i className="msdot" />
                    {item}
                  </span>
                ))}
              </aside>

              {/* hlavní plocha */}
              <div className="mac-main">
                <div className="mac-toolbar">
                  <span className="mac-chip">{d.range}</span>
                  <span className="mac-chip accent">{d.yearsChip}</span>
                </div>

                <div className="mac-grid">
                  {/* zhlédnutí + graf */}
                  <div className="mac-card">
                    <span className="mac-label">{d.viewsLabel}</span>
                    <div className="mac-value">
                      {d.viewsValue} <em className="up">▲ {d.viewsDelta}</em>
                    </div>
                    <div className="mac-chartwrap">
                      <AreaChart
                        id="views"
                        points={[[0, 78], [45, 60], [85, 68], [125, 46], [165, 54], [205, 28], [245, 38], [300, 12]]}
                      />
                    </div>
                  </div>

                  {/* videa + formáty */}
                  <div className="mac-card">
                    <span className="mac-label">{d.videosLabel}</span>
                    <div className="mac-value">{d.videosValue}</div>
                    <span className="mac-label" style={{ marginTop: 14 }}>
                      {d.topLabel}
                    </span>
                    <ul className="mac-list">
                      {d.topItems.map((item) => (
                        <li key={item}>
                          <i className="msdot" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* růst spoluprací přes celou šířku */}
                  <div className="mac-card wide">
                    <span className="mac-label">{d.growthLabel}</span>
                    <div className="mac-value">
                      {d.growthValue} <em className="up">▲ {d.growthDelta}</em>
                    </div>
                    <div className="mac-chartwrap">
                      <AreaChart
                        id="growth"
                        height={72}
                        points={[[0, 62], [50, 48], [95, 56], [140, 38], [185, 46], [230, 24], [270, 32], [300, 14]]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
