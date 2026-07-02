import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store/appStore'
import { useAuthStore } from '@/store/authStore'
import { ROUTES } from '@/routes/RouteConfig'

export function Header() {
  const toggleSidebar = useAppStore((s) => s.toggleSidebar)
  const usuario = useAuthStore((s) => s.usuario)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate(ROUTES.login, { replace: true })
  }

  return (
    <header className="flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-5">
      <button
        type="button"
        onClick={toggleSidebar}
        className="rounded-md p-2 text-slate-500 hover:bg-slate-100"
        aria-label="Alternar menú"
      >
        ☰
      </button>
      <h1 className="text-sm font-medium text-slate-500">
        Sistema POS de Pagos
      </h1>
      <div className="ml-auto flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-slate-700">
            {usuario?.nombre ?? 'Invitado'}
          </p>
          <p className="text-xs text-slate-400">{usuario?.rol}</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
          {usuario?.nombre?.charAt(0).toUpperCase() ?? '?'}
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          Salir
        </button>
      </div>
    </header>
  )
}
