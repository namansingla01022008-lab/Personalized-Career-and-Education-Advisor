'use client'

import { BookmarkSimple } from '@phosphor-icons/react'
import { Badge } from './badge'
import { cn } from '@/lib/utils'

interface ResourceCardProps {
  platform: string
  title: string
  source: string
  duration?: string
  isFree: boolean
  description: string
  url: string
  onSave?: () => void
  isSaved?: boolean
  className?: string
}

export function ResourceCard({
  platform,
  title,
  source,
  duration,
  isFree,
  description,
  url,
  onSave,
  isSaved,
  className
}: ResourceCardProps) {
  const truncate = (str: string, max: number) => 
    str.length > max ? str.slice(0, max) + '...' : str

  return (
    <div className={cn(
      "bg-parchment border border-border rounded-r-md p-4 flex flex-col gap-3 min-w-[280px] max-w-[320px] transition-standard hover:shadow-lg", 
      className
    )}>
      <div className="flex items-center justify-between">
        <span className="type-label text-ink-50">{platform}</span>
        <Badge variant={isFree ? 'teal' : 'warm'}>{isFree ? 'Free' : 'Paid'}</Badge>
      </div>
      
      <p className="type-card-title text-ink leading-tight h-14 overflow-hidden">
        {truncate(title, 55)}
      </p>
      
      <p className="type-caption text-ink-50 h-12 overflow-hidden">
        {truncate(description, 100)}
      </p>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-ink/5">
        <span className="type-caption text-ink-50 font-medium">
          {source}{duration ? ` · ${duration}` : ''}
        </span>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={onSave} 
            className="text-ink-50 hover:text-volt transition-micro p-1"
          >
            <BookmarkSimple size={20} weight={isSaved ? 'fill' : 'regular'} />
          </button>
          
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-ink text-linen text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-r-sm hover:bg-ink-80 transition-micro"
          >
            Start
          </a>
        </div>
      </div>
    </div>
  )
}
