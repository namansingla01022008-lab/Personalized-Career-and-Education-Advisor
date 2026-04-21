'use client'

import { cn } from '@/lib/utils'
import { stripJsonBlock } from '@/server/services/prompts'

interface MessageBubbleProps {
  role: 'user' | 'assistant'
  content: string
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
  const isAssistant = role === 'assistant'
  
  // Strip structured JSON block from assistant text for the bubble
  const cleanContent = isAssistant ? stripJsonBlock(content) : content
  
  if (!cleanContent.trim() && isAssistant && !content.includes('<JSON>')) return null

  return (
    <div className={cn(
      "flex w-full mb-6 animate-fade-in",
      isAssistant ? "justify-start" : "justify-end"
    )}>
      <div className={cn(
        "max-w-[85%] px-5 py-4 rounded-r-lg type-body text-sm",
        isAssistant 
          ? "bg-white border border-border text-ink" 
          : "bg-ink text-linen"
      )}>
        {cleanContent || (isAssistant ? "Calculating..." : "")}
      </div>
    </div>
  )
}
