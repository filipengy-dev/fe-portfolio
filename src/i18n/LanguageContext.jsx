import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from './translations.js'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = typeof localStorage !== 'undefined' && localStorage.getItem('fe-lang')
    return saved === 'en' || saved === 'cs' ? saved : 'cs'
  })

  useEffect(() => {
    localStorage.setItem('fe-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const t = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
