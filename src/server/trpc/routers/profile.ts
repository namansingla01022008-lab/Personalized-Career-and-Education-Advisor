import { router, protectedProcedure } from '../trpc'
import { profiles } from '@/server/db/schema'
import { eq } from 'drizzle-orm'
import { insertProfileSchema } from '@/server/db/zod-schemas'

export const profileRouter = router({
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const profile = await ctx.db.query.profiles.findFirst({
      where: eq(profiles.userId, ctx.userId),
    })
    return profile ?? null
  }),

  updateProfile: protectedProcedure
    .input(insertProfileSchema.partial())
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db.query.profiles.findFirst({
        where: eq(profiles.userId, ctx.userId),
      })
      if (existing) {
        await ctx.db
          .update(profiles)
          .set({ ...input, lastUpdated: new Date() })
          .where(eq(profiles.userId, ctx.userId))
      } else {
        await ctx.db.insert(profiles).values({ userId: ctx.userId, ...input })
      }
      return { success: true }
    }),

  completeOnboarding: protectedProcedure
    .input(
      insertProfileSchema.omit({
        id: true,
        userId: true,
        createdAt: true,
        lastUpdated: true,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db.query.profiles.findFirst({
        where: eq(profiles.userId, ctx.userId),
      })
      if (existing) {
        await ctx.db
          .update(profiles)
          .set({ ...input, lastUpdated: new Date() })
          .where(eq(profiles.userId, ctx.userId))
      } else {
        await ctx.db.insert(profiles).values({ userId: ctx.userId, ...input })
      }
      return { success: true }
    }),
})
