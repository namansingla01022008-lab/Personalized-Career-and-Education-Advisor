'use client'

import { useState, useEffect, useRef } from 'react'

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = async (content: string) => {
    const userMsg: Message = { role: 'user', content }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })

      if (!response.ok) throw new Error('Failed to connect to AI service')

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      
      let assistantMsg: Message = { role: 'assistant', content: '' }
      setMessages([...newMessages, assistantMsg])

      while (true) {
        const { done, value } = await reader!.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue
            
            try {
              const parsed = JSON.parse(data)
              if (parsed.token) {
                assistantMsg.content += parsed.token
                setMessages([...newMessages, { ...assistantMsg }])
              }
              if (parsed.error) setError(parsed.error)
            } catch (e) {
              // ignore partial json
            }
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return { messages, sendMessage, isLoading, error, setMessages }
}
