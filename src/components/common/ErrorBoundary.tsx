import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  message?: string
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('ErrorBoundary capturó un error:', error, info)
  }

  handleReset = (): void => {
    this.setState({ hasError: false, message: undefined })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-100 p-6 text-center">
          <h1 className="text-2xl font-semibold text-slate-800">
            Algo salió mal
          </h1>
          <p className="max-w-md text-sm text-slate-500">
            {this.state.message ?? 'Ocurrió un error inesperado.'}
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            Reintentar
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
