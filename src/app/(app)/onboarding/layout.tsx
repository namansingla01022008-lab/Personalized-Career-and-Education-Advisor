'use client'

import React from 'react'

export default function OnboardingLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <div className="min-h-screen bg-linen flex flex-col items-center py-12 px-6">
      <div className="max-w-xl w-full">
        {/* Simple Progress Bar Placeholder */}
        <div className="mb-12 space-y-4">
          <div className="flex justify-between type-label text-[10px] text-ink-50">
            <span>Education</span>
            <span>Skills</span>
            <span>Context</span>
            <span>Goals</span>
          </div>
          <div className="h-1 w-full bg-parchment rounded-full overflow-hidden">
            <div className="h-full bg-volt transition-all duration-500" style={{ width: '25%' }} />
          </div>
        </div>

        {children}
      </div>
    </div>
  )
}
