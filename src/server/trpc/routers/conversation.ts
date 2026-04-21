import { router, protectedProcedure } from '../trpc'
import { conversations, messages } from '@/server/db/schema'
import { eq, desc } from 'drizzle-orm'
import { z } from 'zod'

export const conversationRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.conversations.findMany({
      where: eq(conversations.userId, ctx.userId),
      orderBy: [desc(conversations.updatedAt)],
    })
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const convo = await ctx.db.query.conversations.findFirst({
        where: eq(conversations.id, input.id),
      })
      if (!convo || convo.userId !== ctx.userId) return null

      const msgs = await ctx.db.query.messages.findMany({
        where: eq(messages.conversationId, input.id),
        orderBy: [desc(messages.createdAt)],
        limit: 10,
      })
      return { conversation: convo, messages: msgs.reverse() }
    }),

  create: protectedProcedure
    .input(z.object({ title: z.string().optional(), topicTag: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      const [convo] = await ctx.db.insert(conversations)
        .values({ 
          userId: ctx.userId, 
          title: input.title ?? 'New Conversation', 
          topicTag: input.topicTag 
        })
        .returning()
      return convo
    }),
})
