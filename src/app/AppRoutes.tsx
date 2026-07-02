import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { ROUTES } from '@/routes/RouteConfig'
import { MainLayout } from '@/components/layout/MainLayout'
import { LoginPage } from '@/pages/login/LoginPage'
import { DashboardPage } from '@/pages/dashboard/DashboardPage'
import { TransaccionesPage } from '@/pages/transacciones/TransaccionesPage'
import { CrearTransaccionPage } from '@/pages/transacciones/CrearTransaccionPage'
import { DetalleTransaccionPage } from '@/pages/transacciones/DetalleTransaccionPage'
import { ConciliacionPage } from '@/pages/conciliacion/ConciliacionPage'
import { ResumenDiarioPage } from '@/pages/conciliacion/ResumenDiarioPage'
import { ReportesPage } from '@/pages/reportes/ReportesPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.login} element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.dashboard} element={<DashboardPage />} />
          <Route
            path={ROUTES.transacciones}
            element={<TransaccionesPage />}
          />
          <Route
            path={ROUTES.crearTransaccion}
            element={<CrearTransaccionPage />}
          />
          <Route
            path={ROUTES.detalleTransaccion()}
            element={<DetalleTransaccionPage />}
          />
          <Route path={ROUTES.conciliacion} element={<ConciliacionPage />} />
          <Route
            path={ROUTES.resumenDiario}
            element={<ResumenDiarioPage />}
          />
          <Route path={ROUTES.reportes} element={<ReportesPage />} />
        </Route>
      </Route>

      <Route path="*" element={<LoginPage />} />
    </Routes>
  )
}
