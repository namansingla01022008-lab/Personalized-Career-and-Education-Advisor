import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { users, profiles, conversations, messages, savedCareers, savedResources, skillProgress } from './schema'

export const insertUserSchema = createInsertSchema(users)
export const selectUserSchema = createSelectSchema(users)

export const insertProfileSchema = createInsertSchema(profiles)
export const selectProfileSchema = createSelectSchema(profiles)

export const insertConversationSchema = createInsertSchema(conversations)
export const insertMessageSchema = createInsertSchema(messages)
export const insertSavedCareerSchema = createInsertSchema(savedCareers)
export const insertSavedResourceSchema = createInsertSchema(savedResources)
export const insertSkillProgressSchema = createInsertSchema(skillProgress)
