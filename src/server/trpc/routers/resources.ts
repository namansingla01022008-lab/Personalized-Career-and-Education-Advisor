import { router, protectedProcedure } from '../trpc'
import { savedResources } from '@/server/db/schema'
import { eq } from 'drizzle-orm'
import { insertSavedResourceSchema } from '@/server/db/zod-schemas'
import { z } from 'zod'

export const resourcesRouter = router({
  saveResource: protectedProcedure
    .input(insertSavedResourceSchema.omit({ id: true, userId: true, createdAt: true }))
    .mutation(async ({ ctx, input }) => {
      const [resource] = await ctx.db.insert(savedResources)
        .values({ 
          userId: ctx.userId, 
          resourceType: input.resourceType as 'video' | 'article' | 'course' | 'wiki',
          title: input.title,
          url: input.url,
          platform: input.platform,
          duration: input.duration,
          isFree: input.isFree as 'free' | 'paid',
          description: input.description,
          thumbnailUrl: input.thumbnailUrl,
          status: input.status as 'new' | 'in_progress' | 'completed',
        })
        .returning()
      return resource
    }),

  listSaved: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.savedResources.findMany({
      where: eq(savedResources.userId, ctx.userId),
    })
  }),

  updateStatus: protectedProcedure
    .input(z.object({ id: z.string().uuid(), status: z.enum(['new', 'in_progress', 'completed']) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(savedResources)
        .set({ status: input.status })
        .where(eq(savedResources.id, input.id))
    }),
})
