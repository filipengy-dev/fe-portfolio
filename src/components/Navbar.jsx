import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext.jsx'
import LogoMark from './LogoMark.jsx'

// Malé vlaječky (inline SVG) pro přepínač jazyka.
const FlagCZ = () => (
  <span className="flag" aria-hidden="true">
    <svg viewBox="0 0 18 12" width="18" height="12">
      <rect width="18" height="6" y="0" fill="#fff" />
      <rect width="18" height="6" y="6" fill="#d7141a" />
      <path d="M0 0 9 6 0 12z" fill="#11457e" />
    </svg>
  </span>
)
const FlagEN = () => (
  <span className="flag" aria-hidden="true">
    <svg viewBox="0 0 18 12" width="18" height="12">
      <rect width="18" height="12" fill="#012169" />
      <path d="M0 0l18 12M18 0L0 12" stroke="#fff" strokeWidth="2.4" />
      <path d="M9 0v12M0 6h18" stroke="#fff" strokeWidth="3.6" />
      <path d="M9 0v12M0 6h18" stroke="#c8102e" strokeWidth="2" />
    </svg>
  </span>
)

export default function Navbar() {
  const { lang, setLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => (document.body.style.overflow = '')
  }, [open])

  const links = [
    { href: '#work', label: t.nav.work },
    { href: '#services', label: t.nav.services },
    { href: '#about', label: t.nav.about },
    { href: '#process', label: t.nav.process },
  ]

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <a href="#top" className="logo" aria-label="Filip Engelhart">
            <LogoMark />
            <span className="logo-text">
              <b>Filip Engelhart</b>
              <span>{t.footer.tagline}</span>
            </span>
          </a>

          <nav className="nav-links" aria-label="Hlavní navigace">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="nav-link">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="nav-right">
            <div className="lang" role="group" aria-label="Jazyk / Language">
              <button
                className={lang === 'cs' ? 'active' : ''}
                onClick={() => setLang('cs')}
                aria-pressed={lang === 'cs'}
              >
                <FlagCZ /> CZ
              </button>
              <button
                className={lang === 'en' ? 'active' : ''}
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
              >
                <FlagEN /> EN
              </button>
            </div>

            <a href="#contact" className="btn btn-primary" style={{ minHeight: 44, padding: '11px 20px' }}>
              {t.nav.cta}
            </a>

            <button
              className={`burger ${open ? 'open' : ''}`}
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              aria-expanded={open}
            >
              <span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Mobilní navigace"
          >
            {[...links, { href: '#contact', label: t.nav.contact }].map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
