import { Languages, Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { usePreferences } from '../../context/PreferencesContext'

export default function Topbar() {
  const { t } = useTranslation()
  const { theme, language, toggleTheme, changeLanguage } =
    usePreferences()

  return (
    <header className="flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:px-6 dark:border-slate-800 dark:bg-slate-900">
      <div>
        <h1 className="text-lg font-normal leading-relaxed text-slate-900 dark:text-white">
          {t('classScheduler')}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {t('subtitle')}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => changeLanguage(language === 'en' ? 'km' : 'en')}
          className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          <Languages size={17} />
          {language === 'en' ? 'ខ្មែរ' : 'English'}
        </button>

        <button
          onClick={toggleTheme}
          aria-label={theme === 'light' ? 'Enable dark mode' : 'Enable light mode'}
          className="rounded-lg border border-slate-200 p-2 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </header>
  )
}