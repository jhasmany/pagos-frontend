import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { loginSchema, type LoginSchema } from '@/utils/validators'
import { useLogin } from '@/hooks/useAuth'
import { useAuthStore } from '@/store/authStore'
import { ROUTES } from '@/routes/RouteConfig'

const fieldClass =
  'mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500'

export function LoginPage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const login = useLogin()
  const navigate = useNavigate()
  const location = useLocation()
  const from =
    (location.state as { from?: { pathname: string } } | null)?.from
      ?.pathname ?? ROUTES.dashboard

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { usuario: 'admin', password: 'admin' },
  })

  if (isAuthenticated) {
    return <Navigate to={ROUTES.dashboard} replace />
  }

  const onSubmit = (values: LoginSchema) => {
    login.mutate(values, {
      onSuccess: () => navigate(from, { replace: true }),
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-700 to-brand-900 p-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <div className="text-3xl">🏦</div>
          <h1 className="mt-2 text-xl font-semibold text-slate-800">
            POS Pagos
          </h1>
          <p className="text-sm text-slate-400">
            Sistema de gestión de pagos
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700">
              Usuario
            </label>
            <input className={fieldClass} {...register('usuario')} />
            {errors.usuario && (
              <p className="mt-1 text-xs text-red-600">
                {errors.usuario.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Contraseña
            </label>
            <input
              type="password"
              className={fieldClass}
              {...register('password')}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {login.isError && (
            <p className="text-sm text-red-600">
              No se pudo iniciar sesión. Verifique sus credenciales.
            </p>
          )}

          <button
            type="submit"
            disabled={login.isPending}
            className="mt-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
          >
            {login.isPending ? 'Ingresando…' : 'Ingresar'}
          </button>

          <p className="text-center text-xs text-slate-400">
            Demo: cualquier usuario y contraseña no vacíos.
          </p>
        </form>
      </div>
    </div>
  )
}
