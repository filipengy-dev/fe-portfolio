import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext.jsx'
import { projects, filterIds, thumbMax, thumbHq } from '../data/projects.js'
import Reveal from './Reveal.jsx'
import VideoModal from './VideoModal.jsx'
import { Play } from './icons.jsx'

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

  const shown = useMemo(() => {
    const list = activeId === 'all' ? projects : projects.filter((p) => p.category === activeId)
    // široká videa (na šířku) k sobě, svislá k sobě
    return [...list].sort((a, b) => (a.vertical ? 1 : 0) - (b.vertical ? 1 : 0))
  }, [activeId])

  return (
    <section className="section" id="work">
      <div className="container">
        <div className="section-head" style={{ maxWidth: '100%' }}>
          <div className="work-head">
            <Reveal>
              <span className="eyebrow">{w.eyebrow}</span>
              <h2 className="section-title">{w.title}</h2>
              <p className="section-sub">{w.sub}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="filters" role="tablist" aria-label="Filtr projektů">
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
          </div>
        </div>

        <motion.div layout className="work-grid">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => {
              const title = lang === 'cs' ? p.titleCs : p.titleEn
              return (
                <motion.article
                  layout
                  key={p.id}
                  className={`work-card ${p.vertical ? 'vertical' : ''}`}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => p.youtubeId && setOpenProject(p)}
                  role={p.youtubeId ? 'button' : undefined}
                  tabIndex={p.youtubeId ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (p.youtubeId && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault()
                      setOpenProject(p)
                    }
                  }}
                  aria-label={p.youtubeId ? `Přehrát: ${title}` : undefined}
                >
                  <div className="work-thumb">
                    {p.youtubeId && (
                      <img
                        src={thumbMax(p.youtubeId)}
                        onError={(e) => {
                          if (!e.currentTarget.dataset.fb) {
                            e.currentTarget.dataset.fb = '1'
                            e.currentTarget.src = thumbHq(p.youtubeId)
                          }
                        }}
                        alt=""
                        loading="lazy"
                      />
                    )}
                    <span className="play">
                      <Play size={22} />
                    </span>
                  </div>
                  <div className="work-meta">
                    <div>
                      <div className="work-cat">{catLabel(p.category)}</div>
                      <h4>{title}</h4>
                    </div>
                    {!p.youtubeId && <span className="work-badge">{w.soon}</span>}
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {openProject && (
          <VideoModal project={openProject} onClose={() => setOpenProject(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
