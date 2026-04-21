import { auth } from '@/lib/auth'
import { db } from '@/server/db'
import { type NextRequest } from 'next/server'

/**
 * tRPC Context Factory
 * Injects DB and Auth Session into every procedure.
 */
export async function createContext(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers })
  
  return {
    db,
    session,
    userId: session?.user?.id ?? null,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
