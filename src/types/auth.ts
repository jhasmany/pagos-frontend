export interface Usuario {
  id: string
  nombre: string
  email: string
  rol: 'ADMIN' | 'OPERADOR'
}

export interface LoginInput {
  usuario: string
  password: string
}

export interface AuthResponse {
  token: string
  usuario: Usuario
}
