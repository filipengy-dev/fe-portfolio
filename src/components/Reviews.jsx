import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext.jsx'
import { reviews, videoReviews } from '../data/reviews.js'
import { thumbHq } from '../data/projects.js'
import Reveal from './Reveal.jsx'
import VideoModal from './VideoModal.jsx'
import { Play } from './icons.jsx'

// výška zabalené recenze v px (zhruba sedm řádků)
const COLLAPSED = 196

function ReviewCard({ item, delay, labels }) {
  const [open, setOpen] = useState(false)
  const [long, setLong] = useState(false)
  const roRef = useRef(null)

  // zjistí, jestli se text vůbec nevejde; hlídá i doměření po načtení fontů
  const measure = useCallback((node) => {
    roRef.current?.disconnect()
    if (!node) return
    const check = () => setLong(node.scrollHeight > COLLAPSED + 24)
    check()
    const ro = new ResizeObserver(check)
    ro.observe(node)
    roRef.current = ro
  }, [])

  const clamped = long && !open

  return (
    <Reveal className="rev-card" delay={delay}>
      <span className="rev-mark" aria-hidden="true">“</span>

      <motion.div
        className={`rev-body ${clamped ? 'is-clamped' : ''}`}
        initial={false}
        animate={{ height: clamped ? COLLAPSED : 'auto' }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="rev-text" ref={measure}>
          {item.text.split('\n\n').map((odstavec, j) => (
            <p key={j}>{odstavec}</p>
          ))}
        </div>
      </motion.div>

      {long && (
        <button className="rev-more" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          {open ? labels.less : labels.more}
        </button>
      )}

      <div className="rev-author">
        {item.logo ? (
          <img className="rev-logo" src={item.logo} alt="" loading="lazy" />
        ) : (
          <span className="rev-initial" aria-hidden="true">
            {item.name.trim().charAt(0)}
          </span>
        )}
        <span className="rev-who">
          <strong>{item.name}</strong>
          {item.role && <em>{item.role}</em>}
        </span>
      </div>
    </Reveal>
  )
}

export default function Reviews() {
  const { t } = useLang()
  const r = t.reviews
  const [openVideo, setOpenVideo] = useState(null)

  // dokud nejsou žádné recenze, sekce se nevykreslí vůbec
  if (!reviews.length && !videoReviews.length) return null

  return (
    <section className="section" id="reviews">
      <div className="container">
        <div className="section-head center">
          <Reveal>
            <span className="eyebrow">{r.eyebrow}</span>
            <h2 className="section-title">{r.title}</h2>
            <p className="section-sub">{r.sub}</p>
          </Reveal>
        </div>

        {reviews.length > 0 && (
          <div className="rev-grid">
            {reviews.map((item, i) => (
              <ReviewCard key={item.id} item={item} delay={i * 0.08} labels={r} />
            ))}
          </div>
        )}

        {videoReviews.length > 0 && (
          <>
            <Reveal className="rev-vidlabel">{r.videoLabel}</Reveal>
            <div className="rev-videos">
              {videoReviews.map((item, i) => (
                <Reveal key={item.id} delay={i * 0.08}>
                  <button
                    className={`rev-video ${item.vertical ? 'vertical' : ''}`}
                    onClick={() => setOpenVideo(item)}
                    aria-label={`${r.playCta}: ${item.name}`}
                  >
                    <img src={thumbHq(item.youtubeId)} alt="" loading="lazy" />
                    <span className="rev-play" aria-hidden="true">
                      <Play size={20} />
                    </span>
                    <span className="rev-vidwho">
                      <strong>{item.name}</strong>
                      {item.role && <em>{item.role}</em>}
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {openVideo && (
          <VideoModal
            project={{
              youtubeId: openVideo.youtubeId,
              vertical: openVideo.vertical,
              titleCs: `${openVideo.name}${openVideo.role ? ', ' + openVideo.role : ''}`,
              titleEn: `${openVideo.name}${openVideo.role ? ', ' + openVideo.role : ''}`,
            }}
            onClose={() => setOpenVideo(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
