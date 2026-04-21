import { Redis } from '@upstash/redis'

/**
 * Upstash Redis Client (REST-based)
 * Safe for serverless/edge functions.
 */
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})
