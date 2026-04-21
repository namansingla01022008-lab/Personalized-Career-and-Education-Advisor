'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Sparkle } from '@phosphor-icons/react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-standard py-4",
      scrolled ? "bg-linen/90 backdrop-blur-md border-b border-border shadow-sm py-3" : "bg-transparent"
    )}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link 
          href="/" 
          className="type-card-title font-syne font-bold transition-micro hover:scale-105 flex items-center gap-2"
          style={{ color: scrolled ? '#0e0e0d' : '#f5f3ee' }}
        >
          <Sparkle size={24} weight="fill" className="text-volt" />
          <span>Path<span className="text-volt">Wise</span></span>
        </Link>
        
        <div className="hidden md:flex items-center gap-10">
          {['How It Works', 'Features', 'About'].map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase().replace(/ /g, '-')}`}
              className={cn(
                "type-label font-bold transition-micro hover:opacity-60",
                scrolled ? "text-ink" : "text-linen"
              )}
            >
              {link}
            </a>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/signin">
            <Button 
              variant={scrolled ? 'ghost' : 'dark-ghost'} 
              size="sm"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="volt" size="sm">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
