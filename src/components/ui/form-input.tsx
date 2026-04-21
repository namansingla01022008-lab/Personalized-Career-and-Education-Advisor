import { cn } from '@/lib/utils'
import { type InputHTMLAttributes, type SelectHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { 
  label?: string
  error?: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> { 
  label?: string
  error?: string
  options: { value: string; label: string }[] 
}

const baseInputStyles = "w-full border border-border rounded-r-sm px-4 py-3 text-ink bg-white font-dm text-sm transition-all focus:border-ink focus:ring-1 focus:ring-ink focus:outline-none placeholder:text-ink-20 disabled:opacity-50"

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="space-y-1.5 w-full">
      {label && <label className="type-label text-ink-80">{label}</label>}
      <input
        className={cn(baseInputStyles, error && "border-ember", className)}
        {...props}
      />
      {error && <p className="text-[10px] uppercase font-bold tracking-wider text-ember">{error}</p>}
    </div>
  )
}

export function Select({ label, error, options, className, ...props }: SelectProps) {
  return (
    <div className="space-y-1.5 w-full relative">
      {label && <label className="type-label text-ink-80">{label}</label>}
      <div className="relative">
        <select
          className={cn(
            baseInputStyles, 
            "appearance-none pr-10", 
            error && "border-ember",
            className
          )}
          {...props}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-ink-50">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && <p className="text-[10px] uppercase font-bold tracking-wider text-ember">{error}</p>}
    </div>
  )
}
