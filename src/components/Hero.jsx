import { motion, useReducedMotion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext.jsx'
import { Arrow, Play } from './icons.jsx'

export default function Hero() {
  const { t } = useLang()
  const reduce = useReducedMotion()

  const ease = [0.16, 1, 0.3, 1]
  const lineUp = {
    hidden: { opacity: 0, y: '0.35em' },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.15 + i * 0.09, ease },
    }),
  }
  const fade = {
    hidden: { opacity: 0, y: 16 },
    show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.5 + i * 0.1, ease } }),
  }

  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
        <motion.div
          className="hero-glow a"
          animate={reduce ? {} : { x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hero-glow b"
          animate={reduce ? {} : { x: [0, -24, 0], y: [0, -18, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container hero-inner">
        <motion.span
          className="hero-status"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="dot" />
          {t.hero.status}
        </motion.span>

        <h1>
          <span className="line">
            <motion.span style={{ display: 'inline-block' }} variants={lineUp} custom={0} initial="hidden" animate="show">
              {t.hero.titleTop}
            </motion.span>
          </span>
          <span className="line">
            <motion.span
              className="skew grad-text"
              variants={lineUp}
              custom={1}
              initial="hidden"
              animate="show"
              style={{ display: 'inline-block' }}
            >
              {t.hero.titleMid}
            </motion.span>
          </span>
          <span className="line">
            <motion.span style={{ display: 'inline-block' }} variants={lineUp} custom={2} initial="hidden" animate="show">
              {t.hero.titleBottom}
            </motion.span>
          </span>
        </h1>

        <motion.p className="hero-sub" variants={fade} custom={0} initial="hidden" animate="show">
          {t.hero.sub.split('Filip Engelhart').length > 1 ? (
            <>
              {t.hero.sub.split('Filip Engelhart')[0]}
              <strong>Filip Engelhart</strong>
              {t.hero.sub.split('Filip Engelhart')[1]}
            </>
          ) : (
            t.hero.sub
          )}
        </motion.p>

        <motion.div className="hero-cta" variants={fade} custom={1} initial="hidden" animate="show">
          <a href="#contact" className="btn btn-primary">
            {t.hero.ctaPrimary} <span className="arrow"><Arrow /></span>
          </a>
          <a href="#work" className="btn btn-ghost">
            <Play size={16} /> {t.hero.ctaSecondary}
          </a>
        </motion.div>

        <motion.p
          className="hero-role"
          style={{
            marginTop: 34,
            fontSize: '0.8rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--faint)',
          }}
          variants={fade}
          custom={2}
          initial="hidden"
          animate="show"
        >
          {t.hero.role}
        </motion.p>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span className="mouse" />
        {t.hero.scroll}
      </div>
    </section>
  )
}
