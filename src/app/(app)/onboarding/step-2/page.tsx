'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/form-input'
import { Button } from '@/components/ui/button'

export default function OnboardingStep2() {
  const router = useRouter()
  const [skillInput, setSkillInput] = useState('')
  const [skills, setSkills] = useState<{name: string, selfRating: number, source: 'onboarding'}[]>([])
  const [interests, setInterests] = useState<string[]>([])
  const [interestInput, setInterestInput] = useState('')

  const addSkill = () => {
    if (!skillInput.trim()) return
    setSkills([...skills, { name: skillInput.trim(), selfRating: 3, source: 'onboarding' }])
    setSkillInput('')
  }

  const addInterest = () => {
    if (!interestInput.trim()) return
    setInterests([...interests, interestInput.trim()])
    setInterestInput('')
  }

  const handleNext = () => {
    sessionStorage.setItem('onboarding_step2', JSON.stringify({ skills, interests }))
    router.push('/onboarding/step-3')
  }

  return (
    <div className="animate-fade-in bg-white border border-border rounded-r-xl p-10 shadow-sm">
      <p className="type-label text-volt mb-2">Step 2 of 4</p>
      <h1 className="type-section text-ink mb-2">Skills & Passions</h1>
      <p className="type-body text-ink-50 mb-10">What are you good at? What do you love doing?</p>
      
      <div className="space-y-10">
        <div>
          <label className="type-label text-ink-80 mb-3 block">Your Skills</label>
          <div className="flex gap-2 mb-4">
            <Input 
              placeholder="e.g. Python, Public Speaking, Canva"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSkill()}
            />
            <Button variant="primary" onClick={addSkill}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <span key={i} className="bg-parchment text-ink px-3 py-1.5 rounded-full text-xs font-bold border border-border flex items-center gap-2">
                {s.name}
                <button onClick={() => setSkills(skills.filter((_, idx) => idx !== i))} className="hover:text-ember">×</button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="type-label text-ink-80 mb-3 block">Interests & Hobbies</label>
          <div className="flex gap-2 mb-4">
            <Input 
              placeholder="e.g. Space exploration, Gaming, Trading"
              value={interestInput}
              onChange={(e) => setInterestInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addInterest()}
            />
            <Button variant="primary" onClick={addInterest}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {interests.map((it, i) => (
              <span key={i} className="bg-volt/10 text-ink px-3 py-1.5 rounded-full text-xs font-bold border border-volt/20 flex items-center gap-2">
                {it}
                <button onClick={() => setInterests(interests.filter((_, idx) => idx !== i))} className="hover:text-ember">×</button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="ghost" className="flex-1" onClick={() => router.back()}>Back</Button>
          <Button variant="volt" className="flex-[2]" onClick={handleNext}>Continue →</Button>
        </div>
      </div>
    </div>
  )
}
