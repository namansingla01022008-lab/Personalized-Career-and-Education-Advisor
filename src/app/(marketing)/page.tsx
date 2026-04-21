'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Button } from '@/components/ui/button'
import { StatCard } from '@/components/ui/stat-card'
import { 
  Compass, 
  TrendUp, 
  Path, 
  Lightning, 
  Target, 
  Student, 
  Briefcase 
} from '@phosphor-icons/react'

export default function LandingPage() {
  // Scroll reveal observer
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1 })
    reveals.forEach((r) => observer.observe(r))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* ─── Hero Section ─────────────────────────────────────────────────── */}
      <section className="min-h-screen bg-night flex items-center justify-center text-center px-6 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(212,255,90,0.08)_0%,_transparent_70%)] pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-volt/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto animate-fade-in">
          <p className="type-label text-volt mb-6 flex items-center justify-center gap-2">
            <Compass size={16} weight="bold" />
            AI-Powered Career Advisory
          </p>
          
          <h1 className="type-hero text-linen mb-8">
            Your Next Step,<br />
            <span className="text-volt">Calculated.</span>
          </h1>
          
          <p className="type-body text-ink-20 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Personalised career and education guidance powered by Gemini AI, 
            matched to your background, skills, and earning goals.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/signup">
              <Button variant="volt" size="lg" className="min-w-[200px]">
                Find My Path
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="dark-ghost" size="lg" className="min-w-[200px]">
                See How It Works ↓
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ─── Stats Section ────────────────────────────────────────────────── */}
      <section className="py-20 bg-linen">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 reveal">
            <StatCard value="240K+" label="Career Paths Mapped" />
            <StatCard value="92%" label="Match Accuracy" />
            <StatCard value="8.4K+" label="Courses Indexed" />
            <StatCard value="3.2x" label="Faster Decisions" />
          </div>
        </div>
      </section>

      {/* ─── How It Works ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 bg-parchment">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <h2 className="type-section text-ink mb-4">Precision Counseling</h2>
            <p className="type-body text-ink-50">Mapping your future in three simple steps.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: <Student size={32} />, 
                title: 'Data Ingestion', 
                desc: 'Tell us your academic level, skills, interests and earning goals.' 
              },
              { 
                icon: <Target size={32} />, 
                title: 'AI Synthesis', 
                desc: 'Our Gemini AI calculates matches across thousands of career trajectories.' 
              },
              { 
                icon: <Path size={32} />, 
                title: 'Actionable Roadmaps', 
                desc: 'Get step-by-step guides, resource lists, and salary benchmarks.' 
              }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="w-16 h-16 bg-ink text-volt rounded-r-md flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="type-card-title text-ink mb-3">{step.title}</h3>
                <p className="type-body text-sm text-ink-50">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features Grid ────────────────────────────────────────────────── */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <h2 className="type-section text-ink mb-8">
                Everything you need to <br />
                <span className="text-volt bg-ink px-2">move forward.</span>
              </h2>
              
              <div className="space-y-8">
                {[
                  { icon: <TrendUp size={24} />, title: "Market-Aligned Scoring", text: "Matches recalculated weekly based on industry demand." },
                  { icon: <Lightning size={24} />, title: "Instant Skill Gap Analysis", text: "Know exactly what to learn to reach the next salary bracket." },
                  { icon: <Briefcase size={24} />, title: "Freelancing Module", text: "Map your existing skills to high-paying gig opportunities." }
                ].map((f, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-volt bg-ink p-3 rounded-full h-fit">{f.icon}</div>
                    <div>
                      <h4 className="type-body font-bold text-ink">{f.title}</h4>
                      <p className="type-caption text-ink-50">{f.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-parchment rounded-r-xl aspect-square flex items-center justify-center p-10 reveal">
              {/* Mockup or Graphic Placeholder */}
              <div className="w-full h-full border-2 border-dashed border-ink/10 flex items-center justify-center text-ink-20 uppercase font-black tracking-tighter text-4xl">
                Mockup Area
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer / CTA ─────────────────────────────────────────────────── */}
      <footer className="bg-ink text-linen py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="type-section text-linen mb-8 reveal">
            Plan your path today to <br />
            <span className="text-volt">capture your tomorrow.</span>
          </h2>
          
          <Link href="/signup">
            <Button variant="volt" size="lg" className="reveal">
              Get Started for Free
            </Button>
          </Link>
          
          <div className="mt-20 pt-10 border-t border-linen/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="type-card-title text-linen">
              Path<span className="text-volt">Wise</span>
            </div>
            <p className="type-caption text-ink-50">
              © {new Date().getFullYear()} PathWise. Calculated with Gemini AI.
            </p>
            <div className="flex gap-8">
              <Link href="#" className="type-caption text-ink-50 hover:text-volt transition-micro">Privacy</Link>
              <Link href="#" className="type-caption text-ink-50 hover:text-volt transition-micro">Terms</Link>
              <Link href="#" className="type-caption text-ink-50 hover:text-volt transition-micro">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
