'use client'

import { useState, useRef, useEffect } from 'react'
import { PaperPlaneTilt, Sparkle } from '@phosphor-icons/react'
import { useChat } from '@/hooks/use-chat'
import { MessageBubble } from './message-bubble'
import { Button } from '@/components/ui/button'

export function ChatWindow() {
  const { messages, sendMessage, isLoading, error } = useChat()
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (!input.trim() || isLoading) return
    sendMessage(input)
    setInput('')
  }

  return (
    <div className="flex flex-col h-[600px] w-full bg-parchment rounded-r-xl border border-border overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-white border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-ink rounded-full flex items-center justify-center text-volt">
            <Sparkle size={18} weight="fill" />
          </div>
          <div>
            <p className="type-label text-[10px] text-ink-50 leading-none mb-1">PathWise AI</p>
            <p className="type-body text-sm font-bold text-ink leading-none">Career Advisor</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-teal rounded-full animate-pulse-dot" />
          <span className="type-caption text-[10px] font-bold text-ink-50">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 scroll-smooth"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-10">
            <div className="w-16 h-16 bg-white border border-border rounded-r-lg flex items-center justify-center text-ink-20 mb-6 group-hover:scale-110 transition-standard">
              <Sparkle size={32} />
            </div>
            <h3 className="type-card-title text-ink mb-2">Hello! I'm your advisor.</h3>
            <p className="type-body text-sm text-ink-50 max-w-xs">
              Ask me about career paths, degree choices, or how to reach your income goals.
            </p>
          </div>
        ) : (
          messages.map((m, i) => (
            <MessageBubble key={i} role={m.role} content={m.content} />
          ))
        )}
        {error && (
          <div className="p-3 bg-ember/10 border border-ember/20 rounded text-ember text-xs font-bold text-center mb-4">
            {error}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-border">
        <div className="relative flex items-center">
          <textarea
            rows={1}
            placeholder="Talk to your advisor..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            className="w-full bg-parchment border border-border rounded-r-sm pl-4 pr-14 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink transition-standard resize-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 text-ink hover:text-volt disabled:opacity-30 disabled:hover:text-ink transition-micro"
          >
            <PaperPlaneTilt size={24} weight="fill" />
          </button>
        </div>
        <p className="type-body text-[9px] text-ink-20 mt-3 uppercase tracking-widest text-center font-bold">
          AI can make mistakes. Verify important career steps.
        </p>
      </div>
    </div>
  )
}
