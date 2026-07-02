import { z } from 'zod'

export const metodoPagoSchema = z.enum([
  'TARJETA',
  'QR',
  'TRANSFERENCIA',
  'EFECTIVO',
])

export const crearTransaccionSchema = z.object({
  comercioId: z.string().min(1, 'Seleccione un comercio'),
  monto: z
    .number({ message: 'El monto es obligatorio' })
    .positive('El monto debe ser mayor a cero'),
  metodoPago: metodoPagoSchema,
})

export type CrearTransaccionSchema = z.infer<typeof crearTransaccionSchema>

export const loginSchema = z.object({
  usuario: z.string().min(1, 'El usuario es obligatorio'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
})

export type LoginSchema = z.infer<typeof loginSchema>
