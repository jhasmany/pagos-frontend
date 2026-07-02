export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-5 py-3 text-center text-xs text-slate-400">
      POS Payments System · {new Date().getFullYear()} · Datos de demostración
      (mock)
    </footer>
  )
}
