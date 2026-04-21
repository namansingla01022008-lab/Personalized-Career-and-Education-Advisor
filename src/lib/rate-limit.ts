import { Ratelimit } from '@upstash/ratelimit'
import { redis } from './redis'

/** 
 * Sliding Window Rate Limiter 
 * 30 queries per 24 hours per user for the free tier.
 */
export const llmRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, '24 h'),
  analytics: true,
  prefix: '@pathwise/llm',
})
