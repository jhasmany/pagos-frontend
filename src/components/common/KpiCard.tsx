interface KpiCardProps {
  label: string
  value: string
  icon: string
  accent?: string
}

export function KpiCard({
  label,
  value,
  icon,
  accent = 'text-brand-600',
}: KpiCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-5">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-2xl">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium uppercase text-slate-400">{label}</p>
        <p className={`text-2xl font-semibold ${accent}`}>{value}</p>
      </div>
    </div>
  )
}
