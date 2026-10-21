
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ShieldAlert,
  RefreshCw,
  UserRound,
  DoorOpen,
  UsersRound,
  FileText,
  AlertCircle,
  X,
} from 'lucide-react'

const conflicts = [
  {
    id: 1,
    type: 'teacher',
    titleKey: 'teacherConflict',
    descriptionKey: 'teacherConflictDescription',
    descriptionValues: { teacher: 'Mr. Dara' },
    classes: ['CS101-A', 'CS101-B'],
    teacher: 'Mr. Dara',
    room: 'R101',
    dayKey: 'monday',
    time: '07:00 – 08:30',
  },
  {
    id: 2,
    type: 'room',
    titleKey: 'roomConflict',
    descriptionKey: 'roomConflictDescription',
    descriptionValues: { room: 'R101' },
    classes: ['CS101-A', 'CS101-B'],
    teacher: 'Mr. Dara / Ms. Chan',
    room: 'R101',
    dayKey: 'monday',
    time: '07:00 – 08:30',
  },
  {
    id: 3,
    type: 'class',
    titleKey: 'classConflict',
    descriptionKey: 'classConflictDescription',
    descriptionValues: { section: 'A' },
    classes: ['CS101-A', 'MATH101-A'],
    teacher: 'Multiple teachers',
    room: 'R101 / R102',
    dayKey: 'monday',
    time: '07:00 – 08:30',
  },
]

const filters = [
  { id: 'all', labelKey: 'all' },
  { id: 'teacher', labelKey: 'teacher' },
  { id: 'room', labelKey: 'room' },
  { id: 'class', labelKey: 'class' },
]

const icons = {
  teacher: UserRound,
  room: DoorOpen,
  class: UsersRound,
}

export default function ConflictPanel() {
  const { t } = useTranslation()

  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedConflict, setSelectedConflict] = useState(null)
  const [checked, setChecked] = useState(false)

  const visibleConflicts = conflicts.filter(
    (conflict) =>
      activeFilter === 'all' || conflict.type === activeFilter,
  )

  const getDescription = (conflict) =>
    t(conflict.descriptionKey, conflict.descriptionValues)

  return (
    <aside className="space-y-4">
      {/* Conflict panel */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 font-semibold text-slate-800 dark:text-white">
            <ShieldAlert size={20} className="shrink-0 text-blue-600" />
            {t('checkConflicts')}
          </h2>

          <button
            type="button"
            onClick={() => setChecked(true)}
            className="flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            <RefreshCw size={14} />
            {t('checkAgain')}
          </button>
        </div>

        {/* Warning summary */}
        <div className="mt-4 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-3 dark:border-red-900 dark:bg-red-950/40">
          <AlertCircle
            className="mt-0.5 shrink-0 text-red-500"
            size={22}
          />

          <div>
            <p className="text-sm font-semibold text-red-700 dark:text-red-400">
              {checked ? t('demoCheckComplete') : t('conflictsFound')}
            </p>

            <p className="mt-1 text-xs text-red-600 dark:text-red-300">
              {t('conflictsDetected', { count: conflicts.length })}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-4 grid grid-cols-4 gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          {filters.map((filter) => {
            const count =
              filter.id === 'all'
                ? conflicts.length
                : conflicts.filter((item) => item.type === filter.id).length

            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`rounded-lg px-1 py-2 text-xs font-medium transition ${
                  activeFilter === filter.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {t(filter.labelKey)} ({count})
              </button>
            )
          })}
        </div>

        {/* Conflict cards */}
        <div className="mt-4 space-y-3">
          {visibleConflicts.map((conflict) => {
            const Icon = icons[conflict.type]

            return (
              <article
                key={conflict.id}
                className="rounded-xl border border-red-100 bg-red-50/70 p-3 dark:border-red-900/70 dark:bg-red-950/20"
              >
                <div className="flex items-start gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {conflict.id}
                  </span>

                  <Icon
                    size={18}
                    className="mt-1 shrink-0 text-slate-600 dark:text-slate-300"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                        {t(conflict.titleKey)}
                      </h3>

                      <button
                        type="button"
                        onClick={() => setSelectedConflict(conflict)}
                        className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800"
                      >
                        {t('viewDetails')}
                      </button>
                    </div>

                    <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                      {getDescription(conflict)}
                    </p>

                    <div className="mt-2 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                      {conflict.classes.map((classCode) => (
                        <p key={classCode} className="break-words pl-1">
                          • {classCode} — ({t(conflict.dayKey)}{' '}
                          {conflict.time})
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* Schedule summary */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h3 className="flex items-center gap-2 font-semibold text-slate-800 dark:text-white">
          <FileText size={18} className="text-blue-600" />
          {t('scheduleSummary')}
        </h3>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('totalClasses')}
            </p>
            <p className="mt-1 text-xl font-bold text-blue-600">20</p>
          </div>

          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('conflicts')}
            </p>
            <p className="mt-1 text-xl font-bold text-red-500">
              {conflicts.length}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('successfullyAssigned')}
            </p>
            <p className="mt-1 text-xl font-bold text-blue-600">17</p>
          </div>

          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('status')}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-red-500">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              {t('notValid')}
            </p>
          </div>
        </div>
      </section>

      {/* Conflict details dialog */}
      {selectedConflict && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
          onClick={() => setSelectedConflict(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="conflict-dialog-title"
            className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl dark:bg-slate-900"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-red-500">
                  {t('conflictNumber', { id: selectedConflict.id })}
                </p>

                <h3
                  id="conflict-dialog-title"
                  className="mt-1 text-lg font-semibold text-slate-900 dark:text-white"
                >
                  {t(selectedConflict.titleKey)}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedConflict(null)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label={t('closeDetails')}
              >
                <X size={18} />
              </button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {getDescription(selectedConflict)}
            </p>

            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-slate-500 dark:text-slate-400">
                  {t('dayAndTime')}
                </dt>
                <dd className="mt-1 font-medium text-slate-800 dark:text-white">
                  {t(selectedConflict.dayKey)}, {selectedConflict.time}
                </dd>
              </div>

              <div>
                <dt className="text-slate-500 dark:text-slate-400">
                  {t('classesInvolved')}
                </dt>
                <dd className="mt-1 break-words font-medium text-slate-800 dark:text-white">
                  {selectedConflict.classes.join(', ')}
                </dd>
              </div>

              <div>
                <dt className="text-slate-500 dark:text-slate-400">
                  {t('teacher')}
                </dt>
                <dd className="mt-1 font-medium text-slate-800 dark:text-white">
                  {selectedConflict.teacher}
                </dd>
              </div>

              <div>
                <dt className="text-slate-500 dark:text-slate-400">
                  {t('room')}
                </dt>
                <dd className="mt-1 font-medium text-slate-800 dark:text-white">
                  {selectedConflict.room}
                </dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={() => setSelectedConflict(null)}
              className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              {t('close')}
            </button>
          </div>
        </div>
      )}
    </aside>
  )
}
