
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Play,
  CalendarDays,
  Calendar,
  Printer,
  Plus,
} from 'lucide-react'

import ConflictPanel from '../components/timetable/ConflictPanel'
import TimetableModal from '../components/timetable/TimetableModal'

const timeSlots = [
  '07:00 - 09:30',
  '09:30 - 12:00',
  '12:00 - 14:30',
  '14:30 - 17:00',
  '17:30 - 20:30',
]

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const initialSchedule = [
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

const availableColors = ['blue', 'purple', 'green', 'orange', 'teal']

function getDefaultTime(rowIndex) {
  const [startTime, endTime] = timeSlots[rowIndex].split(' - ')

  return { startTime, endTime }
}

function getRowIndex(startTime) {
  const startMinutes = toMinutes(startTime)

  return timeSlots.findIndex((slot) => {
    const [start, end] = slot.split(' - ')

    return (
      startMinutes >= toMinutes(start) &&
      startMinutes < toMinutes(end)
    )
  })
}

function toMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

function ScheduleCard({ item, onClick }) {
  if (!item) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label="Add timetable entry"
        className="group flex min-h-[76px] w-full items-center justify-center rounded-lg border border-dashed border-transparent text-sm text-slate-300 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:text-slate-600 dark:hover:border-blue-800 dark:hover:bg-blue-950/40 dark:hover:text-blue-400"
      >
        <Plus
          size={18}
          className="opacity-0 transition group-hover:opacity-100"
        />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      title="Click to edit this timetable entry"
      className={`min-h-[76px] w-full rounded-lg border p-2 text-left transition hover:ring-2 hover:ring-blue-400 ${
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
    </button>
  )
}

export default function ClassScheduler() {
  const { t } = useTranslation()

  const [academicYear, setAcademicYear] = useState('2026-2027')
  const [semester, setSemester] = useState('1')
  const [generationMethod, setGenerationMethod] = useState('automatic')

  const [schedule, setSchedule] = useState(() =>
    initialSchedule.map((row) => [...row])
  )

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [selectedCell, setSelectedCell] = useState(null)

  const handleGenerate = () => {
    alert('Schedule generation will be connected to the API later.')
  }

  // Open the form for a new timetable entry.
  const handleAdd = (rowIndex, dayIndex) => {
    setSelectedEntry(null)
    setSelectedCell({ rowIndex, dayIndex })
    setIsModalOpen(true)
  }

  // Open the form for an existing timetable entry.
  const handleEdit = (item, rowIndex, dayIndex) => {
    const { startTime, endTime } = getDefaultTime(rowIndex)

    setSelectedEntry({
      ...item,
      day: days[dayIndex],
      startTime,
      endTime,
      rowIndex,
      dayIndex,
    })

    setSelectedCell({ rowIndex, dayIndex })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedEntry(null)
    setSelectedCell(null)
  }

  // Insert a new entry or update an existing one.
  const handleSave = (form) => {
    const targetDayIndex = days.indexOf(form.day)
    const targetRowIndex = getRowIndex(form.startTime)

    if (targetDayIndex === -1 || targetRowIndex === -1) {
      alert(
        'The start time must fall within one of the timetable time slots.'
      )
      return
    }

    const startMinutes = toMinutes(form.startTime)
    const endMinutes = toMinutes(form.endTime)
    const [, slotEnd] = timeSlots[targetRowIndex].split(' - ')

    if (
      endMinutes <= startMinutes ||
      endMinutes > toMinutes(slotEnd)
    ) {
      alert(
        `The selected time must fit within ${timeSlots[targetRowIndex]}.`
      )
      return
    }

    const existingEntry = Boolean(selectedEntry)

    // Prevent overwriting another timetable entry.
    const targetCellEntry = schedule[targetRowIndex][targetDayIndex]

    const isSameCell =
      selectedEntry &&
      selectedEntry.rowIndex === targetRowIndex &&
      selectedEntry.dayIndex === targetDayIndex

    if (targetCellEntry && !isSameCell) {
      alert(
        'This time slot already contains a timetable entry. Please choose an empty slot.'
      )
      return
    }

    const updatedItem = {
      code: form.className.trim(),
      subject: form.subject.trim(),
      room: form.room.trim(),
      teacher: form.teacher.trim(),
      color:
        selectedEntry?.color ||
        availableColors[
          Math.floor(Math.random() * availableColors.length)
        ],
    }

    setSchedule((previous) => {
      const next = previous.map((row) => [...row])

      // Remove the old location when editing and moving an entry.
      if (existingEntry) {
        next[selectedEntry.rowIndex][selectedEntry.dayIndex] = null
      }

      // Place the updated entry in its destination cell.
      next[targetRowIndex][targetDayIndex] = updatedItem

      return next
    })

    closeModal()
  }

  // Delete an entry only after the admin confirms.
  const handleDelete = (entry) => {
    const confirmed = window.confirm(
      `Delete ${entry.code} - ${entry.subject}?`
    )

    if (!confirmed) return

    setSchedule((previous) => {
      const next = previous.map((row) => [...row])

      next[entry.rowIndex][entry.dayIndex] = null

      return next
    })

    closeModal()
  }

  return (
    <main className="flex h-[calc(100dvh-4rem)] flex-col overflow-hidden bg-slate-50 p-3 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:p-5">
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
                  onChange={(event) => setAcademicYear(event.target.value)}
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
                  onChange={(event) => setSemester(event.target.value)}
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
                  onChange={(event) =>
                    setGenerationMethod(event.target.value)
                  }
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
            <div className="hide-scrollbar min-h-0 h-full flex-1 overflow-auto rounded-lg">
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

                      {days.map((day, dayIndex) => {
                        const item = schedule[rowIndex][dayIndex]

                        return (
                          <td
                            key={`${day}-${time}`}
                            className="border border-slate-200 p-1 align-top dark:border-slate-700"
                          >
                            <ScheduleCard
                              item={item}
                              onClick={() => {
                                if (item) {
                                  handleEdit(item, rowIndex, dayIndex)
                                } else {
                                  handleAdd(rowIndex, dayIndex)
                                }
                              }}
                            />
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 shrink-0 text-xs text-slate-500 dark:text-slate-400">
              Click an empty cell to add a schedule, or click an existing
              entry to edit or delete it.
            </p>
          </section>
        </div>

        {/* Right side: conflict panel */}
        <aside className="hide-scrollbar min-h-0 min-w-0 overflow-y-auto overscroll-contain">
          <ConflictPanel />
        </aside>
      </div>

      {/* Add / Edit timetable modal */}
      <TimetableModal
        isOpen={isModalOpen}
        onClose={closeModal}
        entry={selectedEntry}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </main>
  )
}
