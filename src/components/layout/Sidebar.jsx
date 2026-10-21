import {
  CalendarDays,
  LayoutDashboard,
  Settings,
  GraduationCap,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

export default function Sidebar() {
  const { t } = useTranslation()
  const [collapsed, setCollapsed] = useState(false)

  const navigation = [
    { label: t('dashboard'), icon: LayoutDashboard },
    { label: t('classScheduler'), icon: CalendarDays },
    { label: t('settings'), icon: Settings },
  ]

  return (
    <aside
      className={`flex min-h-screen flex-col border-r border-slate-200 bg-white transition-all dark:border-slate-800 dark:bg-slate-900 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-4 dark:border-slate-800">
        <GraduationCap className="shrink-0 text-blue-600" size={28} />

        {!collapsed && (
          <span className="text-lg font-bold text-slate-900 dark:text-white">
            Class Scheduler
          </span>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed
            ? <PanelLeftOpen size={18} />
            : <PanelLeftClose size={18} />}
        </button>
      </div>

      <nav className="flex-1 space-y-2 p-3">
        {navigation.map(({ label, icon: Icon }, index) => (
          <button
            key={label}
            title={collapsed ? label : undefined}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
              index === 1
                ? 'bg-blue-50 font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <Icon size={20} className="shrink-0" />

            {!collapsed && (
              <span className="truncate text-sm">{label}</span>
            )}
          </button>
        ))}
      </nav>

      {!collapsed && (
        <div className="border-t border-slate-200 p-4 dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            University Timetable System
          </p>
          <p className="mt-1 text-xs font-medium text-slate-700 dark:text-slate-300">
            Admin Workspace
          </p>
        </div>
      )}
    </aside>
  )
}