import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'

const PreferencesContext = createContext(null)

export function PreferencesProvider({ children }) {
  const { i18n } = useTranslation()

  const [theme, setTheme] = useState(
    () => localStorage.getItem('unischedule-theme') || 'light',
  )

  const [language, setLanguage] = useState(
    () => localStorage.getItem('unischedule-language') || 'en',
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.style.colorScheme = theme
    localStorage.setItem('unischedule-theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('unischedule-language', language)
    document.documentElement.lang = language
    i18n.changeLanguage(language)
  }, [language, i18n])

  const toggleTheme = () => {
    setTheme((current) => current === 'light' ? 'dark' : 'light')
  }

  const changeLanguage = (nextLanguage) => {
    setLanguage(nextLanguage)
  }

  return (
    <PreferencesContext.Provider
      value={{ theme, language, toggleTheme, changeLanguage }}
    >
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences() {
  const context = useContext(PreferencesContext)

  if (!context) {
    throw new Error(
      'usePreferences must be used inside PreferencesProvider',
    )
  }

  return context
}