import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext.jsx'
import { contact } from '../i18n/translations.js'
import { WEB3FORMS_ACCESS_KEY } from '../config.js'
import { Close, Check, Arrow } from './icons.jsx'

export default function ContactModal({ onClose }) {
  const { t } = useLang()
  const c = t.contact
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    // anti-spam honeypot
    if (form.botcheck?.checked) return

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus('error')
      return
    }

    setStatus('sending')
    const fd = new FormData(form)
    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: 'Nová zpráva z portfolia (web)',
      from_name: 'Portfolio – kontaktní formulář',
      name: fd.get('name'),
      email: fd.get('email'),
      replyto: fd.get('email'),
      message: fd.get('message'),
    }
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      setStatus(json.success ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <motion.div
      className="cm-overlay"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      role="dialog"
      aria-modal="true"
      aria-label={c.formTitle}
    >
      <motion.div
        className="cm-card"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      >
        <button className="cm-close" onClick={onClose} aria-label={c.close}>
          <Close size={20} />
        </button>

        {status === 'success' ? (
          <div className="cm-success">
            <span className="cm-check">
              <Check size={30} />
            </span>
            <h3>{c.successTitle}</h3>
            <p>{c.successMsg}</p>
            <button className="btn btn-ghost" onClick={onClose}>
              {c.close}
            </button>
          </div>
        ) : (
          <>
            <span className="eyebrow">{c.eyebrow}</span>
            <h3 className="cm-title">{c.formTitle}</h3>
            <p className="cm-sub">{c.formSub}</p>

            {status === 'error' && (
              <div className="cm-error" role="alert">
                {c.errorMsg}{' '}
                <a href={`mailto:${contact.email}`}>{contact.email}</a>.
              </div>
            )}

            <form className="cm-form" onSubmit={handleSubmit} noValidate>
              {/* honeypot pro roboty */}
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                style={{ display: 'none' }}
                aria-hidden="true"
              />

              <label className="cm-field">
                <span>{c.fName}</span>
                <input type="text" name="name" required autoComplete="name" />
              </label>

              <label className="cm-field">
                <span>{c.fEmail}</span>
                <input type="email" name="email" required autoComplete="email" inputMode="email" />
              </label>

              <label className="cm-field">
                <span>{c.fMessage}</span>
                <textarea name="message" rows={4} required placeholder={c.fMessagePh} />
              </label>

              <button
                type="submit"
                className="btn btn-primary cm-submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  c.sending
                ) : (
                  <>
                    {c.send}
                    <span className="arrow">
                      <Arrow />
                    </span>
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
