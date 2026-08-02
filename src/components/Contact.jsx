import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext.jsx'
import { contact } from '../i18n/translations.js'
import Reveal from './Reveal.jsx'
import ContactModal from './ContactModal.jsx'
import { Mail, Phone, Arrow } from './icons.jsx'

export default function Contact() {
  const { t } = useLang()
  const c = t.contact
  const [formOpen, setFormOpen] = useState(false)

  const rows = [
    { ic: <Mail size={20} />, label: c.email, value: contact.email, href: `mailto:${contact.email}` },
    { ic: <Phone size={20} />, label: c.phone, value: contact.phone, href: `tel:${contact.phoneHref}` },
  ]

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact-card">
          <div className="contact-photo" aria-hidden="true">
            <img src="/photos/IMG_6782.PNG" alt="" loading="lazy" />
          </div>
          <div className="contact-inner">
            <div>
              <Reveal>
                <span className="eyebrow">{c.eyebrow}</span>
                <h2 style={{ whiteSpace: 'pre-line' }}>
                  {c.title.split('\n').map((l, i) => (
                    <span key={i} className={i === 1 ? 'grad-text' : ''} style={{ display: 'block' }}>
                      {l}
                    </span>
                  ))}
                </h2>
                <p>{c.sub}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <button
                  type="button"
                  onClick={() => setFormOpen(true)}
                  className="btn btn-primary"
                  style={{ marginTop: 30 }}
                >
                  {c.cta} <span className="arrow"><Arrow /></span>
                </button>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <div className="contact-list">
                {rows.map((r) => (
                  <a
                    key={r.label}
                    href={r.href}
                    className="contact-row"
                    target={r.href.startsWith('http') ? '_blank' : undefined}
                    rel={r.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <span className="ic">{r.ic}</span>
                    <span className="txt">
                      <small>{r.label}</small>
                      <b>{r.value}</b>
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {formOpen && <ContactModal onClose={() => setFormOpen(false)} />}
      </AnimatePresence>
    </section>
  )
}
