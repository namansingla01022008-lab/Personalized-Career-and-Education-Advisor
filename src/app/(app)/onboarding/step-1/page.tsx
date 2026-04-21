'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Select, Input } from '@/components/ui/form-input'
import { Button } from '@/components/ui/button'

export default function OnboardingStep1() {
  const router = useRouter()
  const [level, setLevel] = useState('')
  const [stream, setStream] = useState('')
  const [year, setYear] = useState('')

  const handleNext = () => {
    // Store in sessionStorage to persist across wizard steps
    const data = { 
      educationLevel: level, 
      stream: stream || null, 
      graduationYear: year ? parseInt(year) : null 
    }
    sessionStorage.setItem('onboarding_step1', JSON.stringify(data))
    router.push('/onboarding/step-2')
  }

  return (
    <div className="animate-fade-in bg-white border border-border rounded-r-xl p-10 shadow-sm">
      <p className="type-label text-volt mb-2">Step 1 of 4</p>
      <h1 className="type-section text-ink mb-2">Academic Foundation</h1>
      <p className="type-body text-ink-50 mb-10">Tell us about your educational background.</p>
      
      <div className="space-y-8">
        <Select
          label="Current Education Level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          options={[
            { value: '', label: 'Select your level...' },
            { value: '10th', label: '10th Grade / Secondary' },
            { value: '12th', label: '12th Grade / Higher Secondary' },
            { value: 'diploma', label: 'Diploma' },
            { value: 'ug', label: 'Undergraduate (UG)' },
            { value: 'pg', label: 'Postgraduate (PG)' },
            { value: 'working', label: 'Working Professional' },
          ]}
        />

        {(['12th', 'ug', 'pg', 'diploma'].includes(level)) && (
          <Input 
            label="Stream / Major" 
            placeholder="e.g. Computer Science, Commerce, Science (PCM)"
            value={stream}
            onChange={(e) => setStream(e.target.value)}
          />
        )}

        <Input 
          label="Graduation Year (Optional)" 
          type="number"
          placeholder="e.g. 2025"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <Button 
          variant="volt" 
          className="w-full mt-6" 
          onClick={handleNext}
          disabled={!level}
        >
          Continue →
        </Button>
      </div>
    </div>
  )
}
