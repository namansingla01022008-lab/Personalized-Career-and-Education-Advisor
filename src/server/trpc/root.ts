import { router } from './trpc'
import { profileRouter } from './routers/profile'
import { conversationRouter } from './routers/conversation'
import { resourcesRouter } from './routers/resources'
import { careersRouter } from './routers/careers'

export const appRouter = router({
  profile: profileRouter,
  conversation: conversationRouter,
  resources: resourcesRouter,
  careers: careersRouter,
})

export type AppRouter = typeof appRouter
