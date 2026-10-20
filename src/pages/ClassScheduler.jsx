import { CalendarDays, Play } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function ClassScheduler() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <section>
        <h2 className="text-2xl font-normal leading-relaxed text-slate-900 dark:text-white">
          {t('generateSchedule')}
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Set the academic term and generate a class schedule.
        </p>
      </section>

      <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2 xl:grid-cols-4 dark:border-slate-800 dark:bg-slate-900">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {t('academicYear')}
          </span>
          <select className="w-full mt-5 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800">
            <option>2026–2027</option>
            <option>2025–2026</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {t('semester')}
          </span>
          <select className="w-full mt-5 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800">
            <option>{t('semester')} 1</option>
            <option>{t('semester')} 2</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {t('generationMethod')}
          </span>
          <select className="w-full mt-5 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800">
            <option>{t('automatic')}</option>
            <option>{t('manual')}</option>
          </select>
        </label>

        <div className="flex items-end">
          <button
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            onClick={() => alert('Schedule generation will be connected later.')}
          >
            <Play size={17} fill="currentColor" />
            {t('generateSchedule')}
          </button>
        </div>
      </section>

      <section className="flex min-h-64 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900">
        <div className="text-center">
          <CalendarDays className="mx-auto text-slate-400" size={38} />
          <h3 className="mt-3 font-semibold text-slate-800 dark:text-slate-200">
            {t('generatedSchedule')}
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            The weekly timetable will appear here.
          </p>
        </div>
      </section>
    </div>
  )
}