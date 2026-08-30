import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext.jsx'
import { projects } from '../data/projects.js'
import Reveal from './Reveal.jsx'
import VideoModal from './VideoModal.jsx'
import { Scissors, Play, Sparkle, Check, Ai, Search, Arrow } from './icons.jsx'

// jednoduché přiřazení ikon ke kartám služeb
const icons = [Scissors, Play, Play, Sparkle, Check, Sparkle, Play, Sparkle, Ai]

// ukázkové video ke každé službě (podle indexu). null = bez lupy (thumbnaily, scénář)
const exampleIds = [
  '2E8GxgTRM1U', // 01 Střih videa      -> DronPro informační video
  'tSfYluucZsc', // 02 Vertikální videa -> Mercedes Instagram reels
  'fGARiuXM0M8', // 03 YouTube & podcasty-> Dáváme podcast
  'Y6peuxHWSYk', // 04 Motion grafika   -> Tycoon motion grafika
  'XdJ48F5NLfM', // 05 Titulky & grafika-> Content Partner Instagram short
  'agJAubvtNJY', // 06 Barevné korekce  -> DronPro recenze
  null, // 07 Thumbnaily
  null, // 08 Nápad & scénář
  'ohmgMUcXXYQ', // 09 AI videa         -> Burton AI short
]

const findProject = (id) => projects.find((p) => p.youtubeId === id)

export default function Services() {
  const { t } = useLang()
  const s = t.services
  const [openProject, setOpenProject] = useState(null)
  const [idx, setIdx] = useState(0)

  const items = s.items
  const n = items.length
  const half = 2 // 5 viditelných karet
  // nejkratší vzdálenost po kruhu (wrap)
  const rel = (i) => {
    let d = (i - idx) % n
    if (d > n / 2) d -= n
    if (d < -n / 2) d += n
    return d
  }

  return (
    <section className="section services-section" id="services">
      {/* fotka jako atmosférická vrstva vpravo — částečně za textem i kartami */}
      <div className="services-photo" aria-hidden="true">
        <img src="/photos/IMG_6783.PNG" alt="" loading="lazy" />
        <span className="services-photo-tag">In the field</span>
      </div>

      <div className="container services-content">
        <div className="section-head center">
          <Reveal>
            <span className="eyebrow">{s.eyebrow}</span>
            <h2 className="section-title">{s.title}</h2>
            <p className="section-sub">{s.sub}</p>
          </Reveal>
        </div>

        <Reveal className="svc-hint">
          <Search size={16} />
          {s.hint}
        </Reveal>

        <Reveal delay={0.08}>
          <div className="ring-wrap svc-ringwrap">
            <div className="ring">
              {items.map((item, i) => {
                const off = rel(i)
                const abs = Math.abs(off)
                const hidden = abs > half
                const Icon = icons[i] || Sparkle
                const example = findProject(exampleIds[i])
                return (
                  <motion.div
                    key={item.n}
                    className="ring-item"
                    data-abs={abs}
                    style={{ zIndex: 10 - abs, pointerEvents: hidden ? 'none' : 'auto' }}
                    animate={{
                      x: `${off * 74}%`,
                      scale: hidden ? 0.6 : 1 - abs * 0.14,
                      opacity: hidden ? 0 : off === 0 ? 1 : 0.45,
                      rotateY: off * -9,
                    }}
                    transition={{ type: 'spring', stiffness: 210, damping: 28 }}
                  >
                    <article
                      className="svc svc-ring-card"
                      onClick={() => off !== 0 && setIdx(i)}
                      role={off !== 0 ? 'button' : undefined}
                      tabIndex={hidden ? -1 : 0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          if (off !== 0) setIdx(i)
                          else if (example) setOpenProject(example)
                        }
                      }}
                      aria-label={off !== 0 ? `Otočit na: ${item.t}` : item.t}
                    >
                      <span className="num">{item.n}</span>
                      <div className="svc-icon">
                        <Icon size={22} />
                      </div>
                      <h3>{item.t}</h3>
                      <p>{item.d}</p>
                      {example && (
                        <button
                          className="svc-example"
                          onClick={(e) => {
                            e.stopPropagation()
                            setOpenProject(example)
                          }}
                          aria-label={`Zobrazit ukázku: ${item.t}`}
                          tabIndex={off === 0 ? 0 : -1}
                        >
                          <Search size={17} />
                        </button>
                      )}
                    </article>
                  </motion.div>
                )
              })}
            </div>

            <button
              className="ring-arrow prev"
              onClick={() => setIdx((idx - 1 + n) % n)}
              aria-label="Předchozí služba"
            >
              <span style={{ display: 'inline-flex', transform: 'rotate(180deg)' }}>
                <Arrow size={20} />
              </span>
            </button>
            <button
              className="ring-arrow next"
              onClick={() => setIdx((idx + 1) % n)}
              aria-label="Další služba"
            >
              <Arrow size={20} />
            </button>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {openProject && (
          <VideoModal project={openProject} onClose={() => setOpenProject(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
