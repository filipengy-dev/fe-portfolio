import { useLang } from '../i18n/LanguageContext.jsx'
import { contact } from '../i18n/translations.js'
import LogoMark from './LogoMark.jsx'
import { Mail, Phone, ArrowUp } from './icons.jsx'

export default function Footer() {
  const { t } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <a href="#top" className="logo" aria-label="Filip Engelhart">
          <LogoMark />
          <span className="logo-text">
            <b>Filip Engelhart</b>
            <span>{t.footer.made}</span>
          </span>
        </a>

        <div className="footer-socials">
          <a className="social" href={`mailto:${contact.email}`} aria-label="E-mail">
            <Mail size={18} />
          </a>
          <a className="social" href={`tel:${contact.phoneHref}`} aria-label="Telefon">
            <Phone size={18} />
          </a>
        </div>

        <a href="#top" className="to-top">
          {t.footer.top} <ArrowUp size={16} />
        </a>
      </div>
      <div className="container" style={{ marginTop: 24 }}>
        <small style={{ color: 'var(--faint)', fontSize: '0.82rem' }}>
          © {year} Filip Engelhart — {t.footer.rights}
        </small>
      </div>
    </footer>
  )
}
