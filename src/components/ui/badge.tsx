import { cn } from '@/lib/utils'

type Variant = 'accent' | 'warm' | 'info' | 'neutral' | 'teal'

const variantClasses: Record<Variant, string> = {
  accent: 'bg-volt/18 text-[#4a7000]',
  warm: 'bg-ember/12 text-[#b53010]',
  info: 'bg-azure/12 text-[#1a55a0]',
  neutral: 'bg-parchment text-ink-80',
  teal: 'bg-teal/12 text-[#1a6a52]',
}

export function Badge({ 
  variant = 'neutral', 
  children, 
  className 
}: { 
  variant?: Variant; 
  children: React.ReactNode; 
  className?: string 
}) {
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider', 
      variantClasses[variant], 
      className
    )}>
      {children}
    </span>
  )
}
