
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Play,
  CalendarDays,
  Calendar,
  Printer,
} from 'lucide-react'
import ConflictPanel from '../components/timetable/ConflictPanel'

const timeSlots = [
  '07:00 - 08:30',
  '08:30 - 10:00',
  '10:00 - 11:30',
  '11:30 - 13:00',
  '13:00 - 14:30',
  '14:30 - 16:00',
  '16:00 - 17:30',
]

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const sampleSchedule = [
  [
    { code: 'CS101-A', subject: 'Programming', room: 'R101', teacher: 'Mr. Dara', color: 'blue' },
    { code: 'CS102-A', subject: 'Database', room: 'R103', teacher: 'Ms. Chan', color: 'purple' },
    { code: 'MATH101-A', subject: 'Calculus', room: 'R102', teacher: 'Ms. Sopheak', color: 'green' },
    { code: 'EE201-A', subject: 'Digital Electronics', room: 'LAB01', teacher: 'Mr. Vuth', color: 'orange' },
    { code: 'CS101-B', subject: 'Programming', room: 'R101', teacher: 'Mr. Dara', color: 'blue' },
    { code: 'PHYS101-A', subject: 'Physics', room: 'LAB01', teacher: 'Mr. Vuth', color: 'teal' },
  ],
  [
    { code: 'MATH101-A', subject: 'Calculus', room: 'R102', teacher: 'Ms. Sopheak', color: 'green' },
    { code: 'CS101-B', subject: 'Programming', room: 'R101', teacher: 'Mr. Dara', color: 'blue' },
    { code: 'CS102-A', subject: 'Database', room: 'R103', teacher: 'Ms. Chan', color: 'purple' },
    { code: 'PHYS101-A', subject: 'Physics', room: 'LAB01', teacher: 'Mr. Vuth', color: 'teal' },
    { code: 'EE201-A', subject: 'Digital Electronics', room: 'LAB01', teacher: 'Mr. Vuth', color: 'orange' },
    { code: 'CS102-B', subject: 'Database', room: 'R103', teacher: 'Ms. Chan', color: 'purple' },
  ],
  [
    { code: 'PHYS101-A', subject: 'Physics', room: 'LAB01', teacher: 'Mr. Vuth', color: 'orange' },
    { code: 'MATH101-A', subject: 'Calculus', room: 'R102', teacher: 'Ms. Sopheak', color: 'green' },
    { code: 'CS101-B', subject: 'Programming', room: 'R101', teacher: 'Mr. Dara', color: 'blue' },
    { code: 'CS102-A', subject: 'Database', room: 'R103', teacher: 'Ms. Chan', color: 'purple' },
    { code: 'PHYS101-A', subject: 'Physics', room: 'LAB01', teacher: 'Mr. Vuth', color: 'teal' },
    { code: 'MATH101-A', subject: 'Calculus', room: 'R102', teacher: 'Ms. Sopheak', color: 'green' },
  ],
  [null, null, null, null, null, null],
  [
    { code: 'CS102-B', subject: 'Database', room: 'R103', teacher: 'Ms. Chan', color: 'purple' },
    { code: 'EE201-A', subject: 'Digital Electronics', room: 'LAB01', teacher: 'Mr. Vuth', color: 'orange' },
    { code: 'CS101-B', subject: 'Programming', room: 'R101', teacher: 'Mr. Dara', color: 'blue' },
    { code: 'MATH101-A', subject: 'Calculus', room: 'R102', teacher: 'Ms. Sopheak', color: 'green' },
    { code: 'CS102-B', subject: 'Database', room: 'R103', teacher: 'Ms. Chan', color: 'purple' },
    { code: 'EE201-A', subject: 'Digital Electronics', room: 'LAB01', teacher: 'Mr. Vuth', color: 'orange' },
  ],
  [
    { code: 'PHYS101-A', subject: 'Physics', room: 'LAB01', teacher: 'Mr. Vuth', color: 'teal' },
    { code: 'CS102-B', subject: 'Database', room: 'R103', teacher: 'Ms. Chan', color: 'purple' },
    { code: 'EE201-A', subject: 'Digital Electronics', room: 'LAB01', teacher: 'Mr. Vuth', color: 'orange' },
    { code: 'CS101-A', subject: 'Programming', room: 'R101', teacher: 'Mr. Dara', color: 'blue' },
    { code: 'MATH101-A', subject: 'Calculus', room: 'R102', teacher: 'Ms. Sopheak', color: 'green' },
    null,
  ],
  [
    null,
    null,
    { code: 'CS102-A', subject: 'Database', room: 'R103', teacher: 'Ms. Chan', color: 'purple' },
    null,
    { code: 'PHYS101-A', subject: 'Physics', room: 'LAB01', teacher: 'Mr. Vuth', color: 'teal' },
    { code: 'CS101-A', subject: 'Programming', room: 'R101', teacher: 'Mr. Dara', color: 'blue' },
  ],
]

const colorClasses = {
  blue: 'border-blue-200 bg-blue-100 dark:border-blue-900 dark:bg-blue-950',
  purple: 'border-purple-200 bg-purple-100 dark:border-purple-900 dark:bg-purple-950',
  green: 'border-green-200 bg-green-100 dark:border-green-900 dark:bg-green-950',
  orange: 'border-orange-200 bg-orange-100 dark:border-orange-900 dark:bg-orange-950',
  teal: 'border-teal-200 bg-teal-100 dark:border-teal-900 dark:bg-teal-950',
}

function ScheduleCard({ item }) {
  if (!item) {
    return (
      <div className="flex min-h-[76px] items-center justify-center rounded-lg text-sm text-slate-300 dark:text-slate-600">
        —
      </div>
    )
  }

  return (
    <div
      className={`min-h-[76px] rounded-lg border p-2 ${
        colorClasses[item.color] || colorClasses.blue
      }`}
    >
      <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
        {item.code}
      </p>
      <p className="mt-1 text-xs text-slate-700 dark:text-slate-300">
        {item.subject}
      </p>
      <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
        {item.room} | {item.teacher}
      </p>
    </div>
  )
}

export default function ClassScheduler() {
  const { t } = useTranslation()

  const [academicYear, setAcademicYear] = useState('2026-2027')
  const [semester, setSemester] = useState('1')
  const [generationMethod, setGenerationMethod] = useState('automatic')

  const handleGenerate = () => {
    alert('Schedule generation will be connected to the API later.')
  }

  return (
    <main className="flex h-[calc(100dvh-4rem)] flex-col overflow-hidden bg-slate-50 p-3 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:p-5">
      {/* Page heading */}
      <header className="mb-4 shrink-0">
        <h1 className="text-xl font-semibold">
          {t('generateSchedule')}
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Set the academic term and generate a class schedule.
        </p>
      </header>

      {/* Timetable and conflict panel */}
      <div className="grid min-h-0 flex-1 grid-cols-1 items-stretch gap-4 xl:grid-cols-[minmax(0,2.1fr)_minmax(320px,0.9fr)]">

        {/* Left side */}
        <div className="flex min-h-0 min-w-0 flex-col gap-4">

          {/* Generate Schedule */}
          <section className="shrink-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-2 2xl:grid-cols-[1fr_1fr_1fr_auto]">
              <label className="block min-w-0">
                <span className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-300">
                  {t('academicYear')}
                </span>
                <select
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
                >
                  <option value="2026-2027">2026 - 2027</option>
                  <option value="2025-2026">2025 - 2026</option>
                </select>
              </label>

              <label className="block min-w-0">
                <span className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-300">
                  {t('semester')}
                </span>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
                >
                  <option value="1">{t('semester')} 1</option>
                  <option value="2">{t('semester')} 2</option>
                </select>
              </label>

              <label className="block min-w-0">
                <span className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-300">
                  {t('generationMethod')}
                </span>
                <select
                  value={generationMethod}
                  onChange={(e) => setGenerationMethod(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
                >
                  <option value="automatic">{t('automatic')}</option>
                  <option value="manual">{t('manual')}</option>
                </select>
              </label>

              <button
                type="button"
                onClick={handleGenerate}
                className="flex min-h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Play size={16} fill="currentColor" />
                {t('generateSchedule')}
              </button>
            </div>
          </section>

          {/* Weekly timetable */}
          <section className="flex min-h-0 min-w-0 flex-1 flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex shrink-0 flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CalendarDays size={20} className="text-blue-600" />
                <h2 className="font-semibold">
                  {t('generatedSchedule')}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <select
                  aria-label="Schedule view"
                  defaultValue="weekly"
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
                >
                  <option value="weekly">Weekly View</option>
                </select>

                <button
                  type="button"
                  aria-label="Calendar view"
                  className="rounded-lg border border-slate-200 p-2 dark:border-slate-700"
                >
                  <Calendar size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700"
                >
                  <Printer size={16} />
                  Print
                </button>
              </div>
            </div>

            {/* Scroll the table, not the entire page */}
            <div className="min-h-0 flex-1 hide-scrollbar h-full overflow-auto rounded-lg">
              <table className="w-full min-w-[1000px] table-fixed border-collapse text-left">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-slate-50 dark:bg-slate-800">
                    <th className="w-28 border border-slate-200 px-2 py-3 text-xs dark:border-slate-700">
                      Time
                    </th>
                    {days.map((day) => (
                      <th
                        key={day}
                        className="border border-slate-200 px-2 py-3 text-center text-xs font-semibold dark:border-slate-700"
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {timeSlots.map((time, rowIndex) => (
                    <tr key={time}>
                      <th className="border border-slate-200 bg-slate-50 px-2 py-3 text-center text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {time}
                      </th>
                      {days.map((day, dayIndex) => (
                        <td
                          key={`${day}-${time}`}
                          className="border border-slate-200 p-1 align-top dark:border-slate-700"
                        >
                          <ScheduleCard
                            item={sampleSchedule[rowIndex][dayIndex]}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 shrink-0 text-xs text-slate-500 dark:text-slate-400">
              Sample timetable data — API integration will be added later.
            </p>
          </section>
        </div>

        {/* Right side: conflict panel */}
        <aside className="min-h-0 min-w-0 overflow-y-auto overscroll-contain hide-scrollbar">
          <ConflictPanel />
        </aside>
      </div>
    </main>
  )
}
