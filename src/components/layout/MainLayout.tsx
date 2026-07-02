import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { Footer } from './Footer'
import { useNotifications } from '@/hooks/useNotifications'

export function MainLayout() {
  // Conecta al canal de notificaciones en tiempo real (simulado).
  useNotifications()

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-slate-100 p-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
