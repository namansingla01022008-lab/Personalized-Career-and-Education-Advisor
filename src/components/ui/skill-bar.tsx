'use client'

import { useEffect, useState, useRef } from 'react'
import { cn } from '@/lib/utils'

interface SkillBarProps { 
  skill: string
  level: number 
  animate?: boolean
}

export function SkillBar({ skill, level, animate = true }: SkillBarProps) {
  const [width, setWidth] = useState(0)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animate) {
      setWidth(level)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setWidth(level)
      }
    }, { threshold: 0.1 })

    if (barRef.current) observer.observe(barRef.current)
    return () => observer.disconnect()
  }, [level, animate])

  return (
    <div className="space-y-2 transition-standard" ref={barRef}>
      <div className="flex justify-between items-baseline">
        <span className="type-body text-sm font-bold text-ink-80">{skill}</span>
        <span className="type-caption font-bold text-ink-50">{level}%</span>
      </div>
      
      <div className="h-2 bg-parchment rounded-full overflow-hidden border border-border">
        <div
          className="h-full bg-volt rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(212,255,90,0.4)]"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}
