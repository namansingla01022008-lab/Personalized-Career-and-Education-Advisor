import { initTRPC, TRPCError } from '@trpc/server'
import { type Context } from './context'
import { ZodError } from 'zod'

import { llmRateLimiter } from '@/lib/rate-limit'

const t = initTRPC.context<Context>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

export const router = t.router
export const publicProcedure = t.procedure

/** 
 * Protected Procedure Middleware 
 */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ 
      code: 'UNAUTHORIZED', 
      message: 'You must be signed in to perform this action.' 
    })
  }
  return next({
    ctx: {
      ...ctx,
      userId: ctx.userId,
    },
  })
})

/**
 * Rate-Limited Procedure
 * Enforces the 30-query/day limit for AI services.
 */
export const rateLimitedProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  const { success } = await llmRateLimiter.limit(ctx.userId)
  if (!success) {
    throw new TRPCError({
      code: 'TOO_MANY_REQUESTS',
      message: `Daily query limit reached. Resets in 24 hours.`,
    })
  }
  return next()
})
