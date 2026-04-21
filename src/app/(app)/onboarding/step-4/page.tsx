'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Select, Input } from '@/components/ui/form-input'
import { Button } from '@/components/ui/button'
import { trpc } from '@/lib/trpc-client'

export default function OnboardingStep4() {
  const router = useRouter()
  const [goal, setGoal] = useState('explore')
  const [income, setIncome] = useState('')
  const [timeline, setTimeline] = useState('3months')
  const [loading, setLoading] = useState(false)

  const mutation = trpc.profile.completeOnboarding.useMutation()

  const handleFinish = async () => {
    setLoading(true)
    try {
      const s1 = JSON.parse(sessionStorage.getItem('onboarding_step1') || '{}')
      const s2 = JSON.parse(sessionStorage.getItem('onboarding_step2') || '{}')
      const s3 = JSON.parse(sessionStorage.getItem('onboarding_step3') || '{}')

      const finalProfile = {
        ...s1,
        ...s2,
        ...s3,
        primaryGoal: goal,
        incomeGoalINR: income ? parseInt(income) : null,
        timeline,
      }

      await mutation.mutateAsync(finalProfile)
      
      // Navigate to dashboard
      router.push('/dashboard')
    } catch (err) {
      console.error('Onboarding failed:', err)
      setLoading(false)
    }
  }

  return (
    <div className="animate-fade-in bg-white border border-border rounded-r-xl p-10 shadow-sm">
      <p className="type-label text-volt mb-2">Step 4 of 4</p>
      <h1 className="type-section text-ink mb-2">Final Ambitions</h1>
      <p className="type-body text-ink-50 mb-10">What do you want to achieve most?</p>
      
      <div className="space-y-8">
        <Select
          label="Primary Goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          options={[
            { value: 'explore', label: 'Explore Career Options' },
            { value: 'find-job', label: 'Find a High-Paying Job' },
            { value: 'upskill', label: 'Upskill in Current Field' },
            { value: 'side-income', label: 'Generate Side Income' },
            { value: 'higher-ed', label: 'Plan for Higher Education' },
          ]}
        />

        <Input 
          label="Target Monthly Income Goal (INR)" 
          type="number"
          placeholder="e.g. 100000"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />

        <Select
          label="Achievement Timeline"
          value={timeline}
          onChange={(e) => setTimeline(e.target.value)}
          options={[
            { value: '3months', label: 'Next 3 Months' },
            { value: '6months', label: 'Next 6 Months' },
            { value: '1year', label: 'Next 12 Months' },
          ]}
        />

        <div className="flex gap-4">
          <Button variant="ghost" className="flex-1" onClick={() => router.back()}>Back</Button>
          <Button 
            variant="volt" 
            className="flex-[2]" 
            onClick={handleFinish}
            disabled={loading}
          >
            {loading ? 'Finalising Profile...' : 'Complete Setup 🎉'}
          </Button>
        </div>
      </div>
    </div>
  )
}
