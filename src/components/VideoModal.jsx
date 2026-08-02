import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext.jsx'
import { Close } from './icons.jsx'

// Lightbox přehrávač YouTube — funguje na šířku i na výšku (shorts).
export default function VideoModal({ project, onClose }) {
  const { lang } = useLang()
  const title = lang === 'cs' ? project.titleCs : project.titleEn

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const src = `https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`

  return (
    <motion.div
      className="vm-overlay"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button className="vm-close" onClick={onClose} aria-label="Zavřít video">
        <Close size={22} />
      </button>

      <motion.div
        className={`vm-frame ${project.vertical ? 'vertical' : ''}`}
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.94, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="vm-video">
          <iframe
            src={src}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className="vm-caption">{title}</div>
      </motion.div>
    </motion.div>
  )
}
