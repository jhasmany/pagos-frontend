import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from '@/routes/RouteConfig'
import { useAppStore } from '@/store/appStore'

export function Sidebar() {
  const sidebarOpen = useAppStore((s) => s.sidebarOpen)

  return (
    <aside
      className={`flex flex-col border-r border-slate-200 bg-white transition-all duration-200 ${
        sidebarOpen ? 'w-60' : 'w-0 overflow-hidden'
      }`}
    >
      <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-5">
        <span className="text-xl">🏦</span>
        <span className="text-base font-semibold text-slate-800">
          POS Pagos
        </span>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-600 hover:bg-slate-100'
              }`
            }
          >
            <span aria-hidden>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
