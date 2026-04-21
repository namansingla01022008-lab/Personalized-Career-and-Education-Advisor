'use client'

import React from 'react'

/** 
 * Session provider wrapper. 
 * BetterAuth hooks handle state internally, but this is a placeholder 
 * for any future cross-component auth state needs.
 */
export function SessionProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
