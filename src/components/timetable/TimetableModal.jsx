import { useEffect, useState } from 'react'
import { X, CalendarDays, Trash2, Save } from 'lucide-react'

const initialForm = {
  subject: '',
  teacher: '',
  room: '',
  className: '',
  day: 'Monday',
  startTime: '07:00',
  endTime: '08:30',
}

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export default function TimetableModal({
  isOpen,
  onClose,
  entry,
  onSave,
  onDelete,
}) {
  const [form, setForm] = useState(initialForm)

  const isEditing = Boolean(entry)

  useEffect(() => {
    if (!isOpen) return

    if (entry) {
      setForm({
        subject: entry.subject ?? '',
        teacher: entry.teacher ?? '',
        room: entry.room ?? '',
        className: entry.className ?? '',
        day: entry.day ?? 'Monday',
        startTime: entry.startTime ?? '07:00',
        endTime: entry.endTime ?? '08:30',
      })
    } else {
      setForm(initialForm)
    }
  }, [isOpen, entry])

  if (!isOpen) return null

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (form.startTime >= form.endTime) {
      alert('End time must be later than start time.')
      return
    }

    onSave({
      ...form,
      id: entry?.id,
    })
  }

  const inputClass =
    'mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-blue-400'

  const labelClass =
    'text-sm font-medium text-gray-700 dark:text-gray-300'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="timetable-modal-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-gray-900"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-2.5 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
              <CalendarDays size={22} />
            </div>

            <div>
              <h2
                id="timetable-modal-title"
                className="text-lg font-semibold text-gray-900 dark:text-white"
              >
                {isEditing ? 'Edit Timetable' : 'Add Timetable'}
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {isEditing
                  ? 'Update this class schedule.'
                  : 'Create a new class schedule.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-white"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-5 px-6 py-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="subject" className={labelClass}>
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="e.g. Computer Networking"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor="teacher" className={labelClass}>
                Teacher
              </label>
              <input
                id="teacher"
                name="teacher"
                value={form.teacher}
                onChange={handleChange}
                placeholder="e.g. Mr. Dara"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor="room" className={labelClass}>
                Room
              </label>
              <input
                id="room"
                name="room"
                value={form.room}
                onChange={handleChange}
                placeholder="e.g. R101"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor="className" className={labelClass}>
                Class
              </label>
              <input
                id="className"
                name="className"
                value={form.className}
                onChange={handleChange}
                placeholder="e.g. CS101-A"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor="day" className={labelClass}>
                Day
              </label>
              <select
                id="day"
                name="day"
                value={form.day}
                onChange={handleChange}
                className={inputClass}
              >
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="startTime" className={labelClass}>
                Start Time
              </label>
              <input
                id="startTime"
                name="startTime"
                type="time"
                value={form.startTime}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor="endTime" className={labelClass}>
                End Time
              </label>
              <input
                id="endTime"
                name="endTime"
                type="time"
                value={form.endTime}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 px-6 py-4 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
            <div>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => onDelete(entry)}
                  className="flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950/40"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                <Save size={16} />
                {isEditing ? 'Save Changes' : 'Add Schedule'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}