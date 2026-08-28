import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext.jsx'
import { projects } from '../data/projects.js'
import Reveal from './Reveal.jsx'
import VideoModal from './VideoModal.jsx'
import { Scissors, Play, Sparkle, Check, Ai, Search } from './icons.jsx'

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

  return (
    <section className="section" id="services">
      <div className="container">
        <div className="services-top">
          <div className="section-head" style={{ marginBottom: 0 }}>
            <Reveal>
              <span className="eyebrow">{s.eyebrow}</span>
              <h2 className="section-title">{s.title}</h2>
              <p className="section-sub">{s.sub}</p>
            </Reveal>
          </div>
          <Reveal delay={0.12} className="services-photo">
            <img src="/photos/IMG_6783.PNG" alt="Filip Engelhart při focení" loading="lazy" />
            <span className="services-photo-tag">In the field</span>
          </Reveal>
        </div>

        <Reveal className="svc-hint">
          <Search size={16} />
          {s.hint}
        </Reveal>

        <div className="services-grid">
          {s.items.map((item, i) => {
            const Icon = icons[i] || Sparkle
            const example = findProject(exampleIds[i])
            return (
              <Reveal className={`svc ${i === 0 ? 'feature' : ''}`} key={item.n} delay={(i % 3) * 0.08}>
                <span className="num">{item.n}</span>
                <div className="svc-icon">
                  <Icon size={22} />
                </div>
                <h3>{item.t}</h3>
                <p>{item.d}</p>
                {example && (
                  <button
                    className="svc-example"
                    onClick={() => setOpenProject(example)}
                    aria-label={`Zobrazit ukázku: ${item.t}`}
                  >
                    <Search size={17} />
                  </button>
                )}
              </Reveal>
            )
          })}
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
