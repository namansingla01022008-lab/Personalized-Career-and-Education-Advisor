import { createTRPCReact } from '@trpc/react-query'
import { type AppRouter } from '@/server/trpc/root'

/**
 * tRPC React Query Client
 * Provides type-safe hooks (useQuery, useMutation) for the entire app.
 */
export const trpc = createTRPCReact<AppRouter>()
