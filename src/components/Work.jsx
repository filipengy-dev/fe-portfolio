import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext.jsx'
import { projects, filterIds, thumbMax, thumbHq } from '../data/projects.js'
import Reveal from './Reveal.jsx'
import VideoModal from './VideoModal.jsx'
import { Play, Arrow } from './icons.jsx'

// náhled s fallbackem maxres -> hqdefault
function Thumb({ id }) {
  return (
    <img
      src={thumbMax(id)}
      onError={(e) => {
        if (!e.currentTarget.dataset.fb) {
          e.currentTarget.dataset.fb = '1'
          e.currentTarget.src = thumbHq(id)
        }
      }}
      alt=""
      loading="lazy"
    />
  )
}

// 3D prstenec videí: prostřední hraje hlavní roli, boční jsou ztlumená.
// Klik na boční kartu / šipky = otočení, klik na prostřední = přehrát.
function Ring({ items, visible, title, lang, catLabel, onOpen, soonLabel }) {
  const [idx, setIdx] = useState(0)
  const n = items.length
  if (n === 0) return null

  const half = Math.floor(visible / 2)
  // nejkratší vzdálenost po kruhu (wrap)
  const rel = (i) => {
    let d = (i - idx) % n
    if (d > n / 2) d -= n
    if (d < -n / 2) d += n
    return d
  }
  const ringClass = items.every((p) => p.vertical) ? 'ring--vertical' : 'ring--wide'

  return (
    <div className="ring-block">
      {title && <p className="ring-title">{title}</p>}
      <div className="ring-wrap">
        <div className={`ring ${ringClass}`}>
          {items.map((p, i) => {
            const off = rel(i)
            const abs = Math.abs(off)
            const hidden = abs > half
            const t = lang === 'cs' ? p.titleCs : p.titleEn
            return (
              <motion.div
                key={p.id}
                className="ring-item"
                data-abs={abs}
                style={{ zIndex: 10 - abs, pointerEvents: hidden ? 'none' : 'auto' }}
                animate={{
                  x: `${off * 74}%`,
                  scale: hidden ? 0.6 : 1 - abs * 0.16,
                  opacity: hidden ? 0 : off === 0 ? 1 : 0.45,
                  rotateY: off * -10,
                }}
                transition={{ type: 'spring', stiffness: 210, damping: 28 }}
              >
                <article
                  className={`work-card ${p.vertical ? 'vertical' : ''}`}
                  onClick={() => (off === 0 ? p.youtubeId && onOpen(p) : setIdx(i))}
                  role="button"
                  tabIndex={hidden ? -1 : 0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      off === 0 ? p.youtubeId && onOpen(p) : setIdx(i)
                    }
                  }}
                  aria-label={off === 0 ? `Přehrát: ${t}` : `Otočit na: ${t}`}
                >
                  <div className="work-thumb">
                    {p.youtubeId && <Thumb id={p.youtubeId} />}
                    <span className="play">
                      <Play size={22} />
                    </span>
                  </div>
                  <div className="work-meta">
                    <div>
                      <div className="work-cat">{catLabel(p.category)}</div>
                      <h4>{t}</h4>
                    </div>
                    {!p.youtubeId && <span className="work-badge">{soonLabel}</span>}
                  </div>
                </article>
              </motion.div>
            )
          })}
        </div>

        {n > 1 && (
          <>
            <button
              className="ring-arrow prev"
              onClick={() => setIdx((idx - 1 + n) % n)}
              aria-label="Předchozí video"
            >
              <span style={{ display: 'inline-flex', transform: 'rotate(180deg)' }}>
                <Arrow size={20} />
              </span>
            </button>
            <button
              className="ring-arrow next"
              onClick={() => setIdx((idx + 1) % n)}
              aria-label="Další video"
            >
              <Arrow size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default function Work() {
  const { lang, t } = useLang()
  const w = t.work
  const [activeId, setActiveId] = useState('all')
  const [openProject, setOpenProject] = useState(null)

  // jen filtry, které mají aspoň jedno video (+ vždy "Vše")
  const filters = useMemo(
    () =>
      filterIds
        .map((id, i) => ({ id, label: w.filters[i] }))
        .filter((f) => f.id === 'all' || projects.some((p) => p.category === f.id)),
    [w.filters]
  )

  const catLabel = (id) => w.filters[filterIds.indexOf(id)] || id

  const shown = useMemo(
    () => (activeId === 'all' ? projects : projects.filter((p) => p.category === activeId)),
    [activeId]
  )
  const wide = shown.filter((p) => !p.vertical)
  const verts = shown.filter((p) => p.vertical)

  const ringProps = { lang, catLabel, onOpen: setOpenProject, soonLabel: w.soon }

  return (
    <section className="section" id="work">
      <div className="container">
        <div className="section-head center">
          <Reveal>
            <span className="eyebrow">{w.eyebrow}</span>
            <h2 className="section-title">{w.title}</h2>
            <p className="section-sub">{w.sub}</p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="filters filters-center" role="tablist" aria-label="Filtr projektů">
            {filters.map((f) => (
              <button
                key={f.id}
                className={`filter ${activeId === f.id ? 'active' : ''}`}
                onClick={() => setActiveId(f.id)}
                aria-pressed={activeId === f.id}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="work-panel">
          <span className="work-panel-glow" aria-hidden="true" />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              className="ring-stack"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeId === 'all' ? (
                <>
                  <Ring items={wide} visible={3} title={w.featuredLabel} {...ringProps} />
                  <Ring items={verts} visible={5} title={w.reelsLabel} {...ringProps} />
                </>
              ) : (
                <Ring items={shown} visible={3} title={null} {...ringProps} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {openProject && (
          <VideoModal project={openProject} onClose={() => setOpenProject(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
