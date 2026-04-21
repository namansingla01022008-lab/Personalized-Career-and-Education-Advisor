import { redis } from './redis'
import { createHash } from 'crypto'

const CACHE_TTL = 60 * 60 * 24 // 24 hours in seconds

/**
 * Generates a unique fingerprint for a specific resource query.
 */
export function getQueryFingerprint(hints: string[]): string {
  return createHash('sha256')
    .update(hints.sort().join('|'))
    .digest('hex')
}

/**
 * Retrieves cached external resources (YouTube/Google/Wiki) if available.
 */
export async function getCachedResources(hints: string[]) {
  const key = `resources:${getQueryFingerprint(hints)}`
  const cached = await redis.get(key)
  return cached ? JSON.parse(cached as string) : null
}

/**
 * Persists aggregated external resources to Redis for 24 hours.
 */
export async function setCachedResources(hints: string[], data: unknown) {
  const key = `resources:${getQueryFingerprint(hints)}`
  await redis.setex(key, CACHE_TTL, JSON.stringify(data))
}
