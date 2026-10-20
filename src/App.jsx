import Sidebar from './components/layout/Sidebar'
import Topbar from './components/layout/Topbar'
import ClassScheduler from './pages/ClassScheduler'

function App() {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="min-w-0 flex-1">
        <Topbar />
        <main>
          <ClassScheduler />
        </main>
      </div>
    </div>
  )
}

export default App