import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext.jsx'
import { clients } from '../i18n/translations.js'
import { rangeAll, viewIds } from '../data/dashboard.js'
import Reveal from './Reveal.jsx'

/* ---------- graf ---------- */

// hladká křivka přes body (Catmull-Rom -> kubický bézier)
function smoothPath(pts) {
  if (pts.length < 2) return ''
  let d = `M${pts[0].x},${pts[0].y}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`
  }
  return d
}

// Area graf s hoverem: kurzor drží crosshair, tečku a bublinu s hodnotou.
function MacChart({ id, values, labels, unit, height = 132 }) {
  const reduce = useReducedMotion()
  const [hover, setHover] = useState(null)
  const wrapRef = useRef(null)

  const max = Math.max(...values) * 1.12
  const pts = values.map((v, i) => ({
    x: (i / (values.length - 1)) * 100,
    y: 100 - (v / max) * 100,
  }))
  const line = smoothPath(pts)
  const area = `${line} L100,100 L0,100 Z`

  const pick = (e) => {
    const box = wrapRef.current?.getBoundingClientRect()
    if (!box) return
    const ratio = Math.min(1, Math.max(0, (e.clientX - box.left) / box.width))
    setHover(Math.round(ratio * (values.length - 1)))
  }

  const active = hover != null ? pts[hover] : null

  return (
    <div
      className="mac-chartwrap"
      ref={wrapRef}
      style={{ height }}
      onPointerMove={pick}
      onPointerDown={pick}
      onPointerLeave={() => setHover(null)}
      role="img"
      aria-label={`Graf: ${values.length} hodnot, maximum ${Math.max(...values)} ${unit}`}
    >
      <svg className="mac-chart" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.42" />
            <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1="0" x2="100" y1={100 * f} y2={100 * f} stroke="rgba(255,255,255,0.05)" vectorEffect="non-scaling-stroke" />
        ))}
        <motion.path
          d={area}
          fill={`url(#${id}-fill)`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: reduce ? 0 : 0.35 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke="#a78bfa"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={reduce ? { opacity: 0 } : { pathLength: 0 }}
          animate={reduce ? { opacity: 1 } : { pathLength: 1 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        />
        {active && (
          <line
            x1={active.x}
            x2={active.x}
            y1="0"
            y2="100"
            stroke="rgba(196,181,253,0.45)"
            strokeDasharray="3 3"
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>

      {active && (
        <>
          <span className="mac-dot" style={{ left: `${active.x}%`, top: `${active.y}%` }} />
          <span
            className="mac-tip"
            style={{
              left: `${active.x}%`,
              top: `${active.y}%`,
              transform: `translate(${active.x > 70 ? '-100%' : active.x < 30 ? '0' : '-50%'}, calc(-100% - 14px))`,
            }}
          >
            <i />
            <b>{values[hover].toLocaleString('cs-CZ')}</b> {unit}
            {labels?.[hover] && <em>{labels[hover]}</em>}
          </span>
        </>
      )}
    </div>
  )
}

/* ---------- logo klienta ---------- */

// Odkaz udělá tam, kde se o to řekne (`linked`) a kde je vyplněná adresa.
// Bez adresy zůstane logo obyčejným obrázkem, ať nic neslibuje naprázdno.
function ClientLogo({ client, className, linked = false }) {
  const inner = client.logo ? (
    <img src={client.logo} alt={client.name} className={client.inv ? 'inv' : ''} loading="lazy" />
  ) : (
    <span className="mac-logo-text">{client.name}</span>
  )

  if (!linked || !client.url) return <span className={className}>{inner}</span>

  return (
    <a
      className={`${className} is-link`}
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${client.name}, otevřít web v nové záložce`}
    >
      {inner}
    </a>
  )
}

/* ---------- okno ---------- */

export default function Stats() {
  const { t } = useLang()
  const d = t.dash

  const [view, setView] = useState('overview')
  const [zoom, setZoom] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const sideRef = useRef(null)

  // šipky nahoru/dolů v bočním menu
  const onSideKey = (e, i) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    e.preventDefault()
    const next = (i + (e.key === 'ArrowDown' ? 1 : -1) + viewIds.length) % viewIds.length
    setView(viewIds[next])
    sideRef.current?.querySelectorAll('button')[next]?.focus()
  }

  const counts = { clients: clients.length }
  const hasClientLinks = clients.some((c) => c.url)

  // Výška okna se dopočítává z aktivního pohledu a animuje se.
  // Bez toho se při přepnutí záložky obsah odmountuje, okno spadne na nulu
  // a hned zase vyskočí, což problikne.
  const [boxH, setBoxH] = useState(null)
  const roRef = useRef(null)
  const measureRef = useCallback((node) => {
    roRef.current?.disconnect()
    if (!node) return
    const apply = () => {
      const h = node.offsetHeight
      if (h > 0) setBoxH(h) // sbalené okno hlásí 0, tu ignorujeme
    }
    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(node)
    roRef.current = ro
  }, [])

  return (
    <section className="section" style={{ paddingTop: 'clamp(56px, 8vw, 100px)' }} id="dashboard">
      <div className="container">
        <Reveal>
          <div className={`macwin ${zoom ? 'is-zoom' : ''} ${collapsed ? 'is-collapsed' : ''}`}>
            {/* titlebar */}
            <div className="mac-titlebar" onDoubleClick={() => setCollapsed((c) => !c)}>
              <span className="mac-dots">
                <button className="d-red" type="button" aria-label={d.uiClose} title={d.uiClose} disabled />
                <button
                  className="d-yellow"
                  type="button"
                  onClick={() => setCollapsed((c) => !c)}
                  aria-label={collapsed ? d.uiRestore : d.uiCollapse}
                  title={collapsed ? d.uiRestore : d.uiCollapse}
                />
                <button
                  className="d-green"
                  type="button"
                  onClick={() => setZoom((z) => !z)}
                  aria-label={zoom ? d.uiShrink : d.uiZoom}
                  title={zoom ? d.uiShrink : d.uiZoom}
                />
              </span>
              <span className="mac-title">{d.winTitle}</span>
            </div>

            <div className="mac-body">
              {/* boční menu = skutečné přepínání pohledů */}
              <aside className="mac-side" ref={sideRef} role="tablist" aria-label={d.winTitle}>
                {d.side.map((item, i) => {
                  const v = viewIds[i]
                  return (
                    <button
                      key={item}
                      role="tab"
                      type="button"
                      aria-selected={view === v}
                      className={`mac-side-item ${view === v ? 'active' : ''}`}
                      onClick={() => setView(v)}
                      onKeyDown={(e) => onSideKey(e, i)}
                    >
                      <i className="msdot" />
                      {item}
                      {counts[v] != null && <b className="mac-side-count">{counts[v]}</b>}
                    </button>
                  )
                })}
              </aside>

              {/* hlavní plocha */}
              <div className="mac-main">
                <motion.div
                  className="mac-viewport"
                  initial={false}
                  animate={{ height: boxH ?? 'auto' }}
                  transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={view}
                      ref={measureRef}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* ---- přehled ---- */}
                      {view === 'overview' && (
                        <div className="mac-grid">
                          <div className="mac-card">
                            <span className="mac-label">{d.viewsLabel}</span>
                            <div className="mac-value">
                              {d.viewsValue} <em className="up">▲ {d.viewsDelta}</em>
                            </div>
                            <MacChart id="ov-views" values={rangeAll.values} unit={d.unitViews} height={112} />
                            <p className="mac-note">{d.chartHint}</p>
                          </div>

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

                          {/* loga tu nejsou schválně, jsou v záložce Klienti */}
                          <div className="mac-card wide">
                            <span className="mac-label">{d.growthLabel}</span>
                            <div className="mac-value">
                              {d.growthValue} <em className="up">▲ {d.growthDelta}</em>
                            </div>
                            <button className="mac-linkbtn" onClick={() => setView('clients')}>
                              {d.allClients} →
                            </button>
                          </div>
                        </div>
                      )}

                      {/* ---- klienti ---- */}
                      {view === 'clients' && (
                        <>
                          <div className="mac-toolbar">
                            <span className="mac-chip accent">
                              {d.growthValue} {d.growthDelta}
                            </span>
                          </div>
                          <div className="mac-clients">
                            {clients.map((c, i) => (
                              <motion.div
                                key={c.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                              >
                                <ClientLogo client={c} className="mac-client" linked />
                                <em className="mac-client-name">
                                  {c.name}
                                  {c.url && <span className="mac-client-go">↗</span>}
                                </em>
                              </motion.div>
                            ))}
                          </div>
                          {hasClientLinks && <p className="mac-note">{d.clientsHint}</p>}
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
