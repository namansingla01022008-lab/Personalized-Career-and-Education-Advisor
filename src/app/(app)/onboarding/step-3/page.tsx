'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Select, Input } from '@/components/ui/form-input'
import { Button } from '@/components/ui/button'

export default function OnboardingStep3() {
  const router = useRouter()
  const [exp, setExp] = useState('0')
  const [mode, setMode] = useState('remote')
  const [location, setLocation] = useState('')

  const handleNext = () => {
    sessionStorage.setItem('onboarding_step3', JSON.stringify({ 
      workExperienceMonths: parseInt(exp), 
      preferredWorkMode: mode, 
      targetLocation: location || null
    }))
    router.push('/onboarding/step-4')
  }

  return (
    <div className="animate-fade-in bg-white border border-border rounded-r-xl p-10 shadow-sm">
      <p className="type-label text-volt mb-2">Step 3 of 4</p>
      <h1 className="type-section text-ink mb-2">Work Preferences</h1>
      <p className="type-body text-ink-50 mb-10">How and where do you want to work?</p>
      
      <div className="space-y-8">
        <Input 
          label="Prior Work Experience (Months)" 
          type="number"
          value={exp}
          onChange={(e) => setExp(e.target.value)}
          min="0"
        />

        <Select
          label="Preferred Work Mode"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          options={[
            { value: 'remote', label: '100% Remote' },
            { value: 'hybrid', label: 'Hybrid' },
            { value: 'on-site', label: 'On-site Office' },
            { value: 'freelance', label: 'Freelancing / Project-based' },
          ]}
        />

        <Input 
          label="Target Location (Optional)" 
          placeholder="e.g. Bangalore, Mumbai, or 'Anywhere'"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <div className="flex gap-4">
          <Button variant="ghost" className="flex-1" onClick={() => router.back()}>Back</Button>
          <Button variant="volt" className="flex-[2]" onClick={handleNext}>Continue →</Button>
        </div>
      </div>
    </div>
  )
}
