interface StatCardProps {
  value: string
  label: string
  trend?: string
  trendType?: 'positive' | 'negative'
}

export function StatCard({ value, label, trend, trendType = 'positive' }: StatCardProps) {
  return (
    <div className="text-center p-6 bg-white border border-border rounded-r-lg hover:border-ink/20 transition-standard group">
      <p className="type-section text-ink group-hover:scale-105 transition-emphasis">{value}</p>
      <p className="type-label text-ink-50 mt-1">{label}</p>
      {trend && (
        <p className={`type-caption mt-1 font-bold ${trendType === 'positive' ? 'text-teal' : 'text-ember'}`}>
          {trend}
        </p>
      )}
    </div>
  )
}
