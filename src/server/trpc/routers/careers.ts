import { router, protectedProcedure } from '../trpc'
import { savedCareers } from '@/server/db/schema'
import { eq } from 'drizzle-orm'
import { insertSavedCareerSchema } from '@/server/db/zod-schemas'
import { z } from 'zod'

export const careersRouter = router({
  saveCareer: protectedProcedure
    .input(insertSavedCareerSchema.omit({ id: true, userId: true, createdAt: true }))
    .mutation(async ({ ctx, input }) => {
      const [career] = await ctx.db.insert(savedCareers)
        .values({ 
          userId: ctx.userId, 
          careerTitle: input.careerTitle,
          matchScore: input.matchScore,
          skillGapPercent: input.skillGapPercent,
          salaryRange: input.salaryRange,
        })
        .returning()
      return career
    }),

  listSaved: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.savedCareers.findMany({
      where: eq(savedCareers.userId, ctx.userId),
    })
  }),

  deleteCareer: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(savedCareers).where(eq(savedCareers.id, input.id))
    }),
})
