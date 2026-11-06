import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { TRANSLATIONS } from './translations'

export const GLOBAL_LOCALES = [
  { code: 'en-in', label: 'India', region: 'India (English)', country: '🇮🇳' },
  { code: 'en-us', label: 'USA', region: 'United States (English)', country: '🇺🇸' },
  { code: 'zh-cn', label: '中文', region: 'China (中国 · 简体中文)', country: '🇨🇳' },
]

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [selectedLocale, setSelectedLocale] = useState(() => {
    try {
      const saved = localStorage.getItem('uandwe_locale')
      if (saved) {
        const parsed = JSON.parse(saved)
        const match = GLOBAL_LOCALES.find((l) => l.code === parsed.code)
        if (match) return match
      }
    } catch {
      // ignore
    }
    return GLOBAL_LOCALES[0]
  })

  const isZh = selectedLocale?.code === 'zh-cn'

  const changeLocale = useCallback((localeOrCode) => {
    let nextLocale = localeOrCode
    if (typeof localeOrCode === 'string') {
      nextLocale = GLOBAL_LOCALES.find((l) => l.code === localeOrCode) || GLOBAL_LOCALES[0]
    }
    setSelectedLocale(nextLocale)
    try {
      localStorage.setItem('uandwe_locale', JSON.stringify(nextLocale))
    } catch {
      // ignore
    }
    window.dispatchEvent(new CustomEvent('uandwe_locale_change', { detail: nextLocale }))
  }, [])

  useEffect(() => {
    const handleLocaleChange = (e) => {
      if (e.detail && e.detail.code !== selectedLocale.code) {
        setSelectedLocale(e.detail)
      }
    }
    window.addEventListener('uandwe_locale_change', handleLocaleChange)
    return () => window.removeEventListener('uandwe_locale_change', handleLocaleChange)
  }, [selectedLocale.code])

  const t = useMemo(() => {
    return isZh ? TRANSLATIONS['zh-cn'] : TRANSLATIONS.en
  }, [isZh])

  const value = useMemo(
    () => ({
      locale: selectedLocale.code,
      selectedLocale,
      isZh,
      t,
      setLocale: changeLocale,
      changeLanguage: changeLocale,
      locales: GLOBAL_LOCALES,
    }),
    [selectedLocale, isZh, t, changeLocale]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (!context) {
    return {
      locale: 'en-in',
      selectedLocale: GLOBAL_LOCALES[0],
      isZh: false,
      t: TRANSLATIONS.en,
      setLocale: () => {},
      changeLanguage: () => {},
      locales: GLOBAL_LOCALES,
    }
  }
  return context
}

export const useLanguage = useTranslation

