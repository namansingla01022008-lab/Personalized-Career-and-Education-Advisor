'use client'

import { trpc } from '@/lib/trpc-client'
import { StatCard } from '@/components/ui/stat-card'
import { SkillBar } from '@/components/ui/skill-bar'
import { ResourceCard } from '@/components/ui/resource-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Sparkle, 
  ArrowRight, 
  TrendUp, 
  Briefcase 
} from '@phosphor-icons/react'
import Link from 'next/link'

export default function DashboardPage() {
  const { data: profile } = trpc.profile.getProfile.useQuery()
  const { data: careers } = trpc.careers.listSaved.useQuery()
  const { data: resources } = trpc.resources.listSaved.useQuery()

  return (
    <main className="min-h-screen bg-linen pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="animate-fade-in">
            <p className="type-label text-volt tracking-[0.2em] mb-2 font-bold">Your Command Center</p>
            <h1 className="type-section text-ink">Welcome back, {profile?.stream || 'Pathfinder'}</h1>
          </div>
          <Link href="/advisor">
            <button className="btn-volt btn-lg shadow-lg hover:translate-y-[-2px] transition-emphasis">
              <Sparkle weight="fill" size={20} className="mr-2" />
              Open AI Advisor
            </button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 reveal">
          <StatCard value={careers?.length?.toString() || '0'} label="Saved Careers" />
          <StatCard value={resources?.length?.toString() || '0'} label="Library Items" />
          <StatCard value="₹5.2L" label="Potential Salary" trend="+12%" />
          <StatCard value="14" label="Hours Learned" trend="This week" trendType="positive" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Content (Careers & Skills) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Top Career Matches */}
            <section className="bg-white border border-border rounded-r-xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="type-card-title text-ink flex items-center gap-2">
                  <Briefcase size={24} weight="bold" />
                  Your Top Matches
                </h3>
                <Link href="/advisor" className="type-caption font-bold text-ink-50 hover:text-volt flex items-center gap-1 transition-micro">
                  Get More <ArrowRight size={14} />
                </Link>
              </div>

              {careers && careers.length > 0 ? (
                <div className="space-y-4">
                  {careers.map((career) => (
                    <div key={career.id} className="p-5 bg-parchment rounded-r-md border border-border flex items-center justify-between group hover:border-ink/20 transition-standard">
                      <div>
                        <p className="type-body font-bold text-ink mb-1">{career.careerTitle}</p>
                        <div className="flex gap-2">
                          <Badge variant="accent">{career.matchScore}% Match</Badge>
                          <Badge variant="neutral">Gap: {career.skillGapPercent}%</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="type-body text-sm font-bold text-ink">
                          {career.salaryRange && typeof career.salaryRange === 'object' && 'mid' in career.salaryRange
                            ? `₹${((career.salaryRange as { mid: number }).mid / 100000).toFixed(1)}L/pa`
                            : '---'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-parchment/50 border border-dashed border-border rounded-r-md">
                   <p className="type-body text-ink-50 text-sm">No careers saved yet. Talk to Gemini to discover paths!</p>
                </div>
              )}
            </section>

            {/* Learning Library */}
            <section>
              <h3 className="type-card-title text-ink mb-6 flex items-center gap-2">
                <TrendUp size={24} weight="bold" />
                Featured for You
              </h3>
              <div className="flex overflow-x-auto gap-6 pb-4 scroll-smooth no-scrollbar">
                {resources?.slice(0,3).map((res) => (
                  <ResourceCard
                    key={res.id}
                    title={res.title}
                    platform={res.platform || 'Web'}
                    source={res.isFree === 'free' ? 'Free Course' : 'Premium'}
                    isFree={res.isFree === 'free'}
                    description={res.description || ''}
                    url={res.url}
                    isSaved={true}
                  />
                ))}
                {(!resources || resources.length === 0) && (
                   [1,2,3].map(i => (
                     <div key={i} className="w-[300px] h-[200px] shrink-0 bg-parchment border border-border rounded-r-md border-dashed opacity-50 p-6">
                        <div className="w-10 h-1 bg-ink/10 rounded mb-4" />
                        <div className="w-full h-4 bg-ink/5 rounded mb-2" />
                        <div className="w-2/3 h-4 bg-ink/5 rounded" />
                     </div>
                   ))
                )}
              </div>
            </section>
          </div>

          {/* Sidebar (Skills & Profile) */}
          <div className="lg:col-span-4 space-y-10">
            <section className="bg-ink text-linen rounded-r-xl p-8 border border-ink-80 shadow-lg">
              <h3 className="type-label text-volt mb-8 block font-bold tracking-widest leading-none">Skill Progress</h3>
              <div className="space-y-6">
                {profile?.skills?.map((s, i: number) => (
                  <SkillBar 
                    key={i} 
                    skill={s.name} 
                    level={s.selfRating * 20} 
                  />
                ))}
                {(!profile?.skills || profile.skills.length === 0) && (
                   <p className="type-caption text-ink-50">Add skills during onboarding to track progress.</p>
                )}
              </div>
            </section>

            <section className="bg-white border border-border rounded-r-xl p-8 shadow-sm">
              <p className="type-label text-ink-50 mb-4">Current Focus</p>
              <p className="type-body text-sm font-bold text-ink italic leading-tight">
                "I want to {profile?.primaryGoal || 'explore options'} in the next {profile?.timeline || 'few months'} and reach a salary of ₹{profile?.incomeGoalINR?.toLocaleString() || '---'}."
              </p>
              <div className="mt-8 border-t border-border pt-6">
                <Link href="/onboarding/step-1">
                  <Button variant="ghost" size="sm" className="w-full">Edit Profile</Button>
                </Link>
              </div>
            </section>
          </div>

        </div>
      </div>
    </main>
  )
}
