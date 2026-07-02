import { Providers } from './Providers'
import { AppRoutes } from './AppRoutes'
import { NotificationToast } from '@/components/common/NotificationToast'

export default function App() {
  return (
    <Providers>
      <AppRoutes />
      <NotificationToast />
    </Providers>
  )
}
