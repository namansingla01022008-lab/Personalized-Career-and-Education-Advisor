import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import {
  users,
  profiles,
  conversations,
  messages,
  savedCareers,
  savedResources,
  skillProgress,
  feedback,
} from './schema'

// Users
export const insertUserSchema = createInsertSchema(users)
export const selectUserSchema = createSelectSchema(users)

// Profiles
export const insertProfileSchema = createInsertSchema(profiles)
export const selectProfileSchema = createSelectSchema(profiles)

// Conversations
export const insertConversationSchema = createInsertSchema(conversations)
export const selectConversationSchema = createSelectSchema(conversations)

// Messages
export const insertMessageSchema = createInsertSchema(messages)
export const selectMessageSchema = createSelectSchema(messages)

// Saved Careers
export const insertSavedCareerSchema = createInsertSchema(savedCareers)
export const selectSavedCareerSchema = createSelectSchema(savedCareers)

// Saved Resources
export const insertSavedResourceSchema = createInsertSchema(savedResources)
export const selectSavedResourceSchema = createSelectSchema(savedResources)

// Skill Progress
export const insertSkillProgressSchema = createInsertSchema(skillProgress)
export const selectSkillProgressSchema = createSelectSchema(skillProgress)

// Feedback
export const insertFeedbackSchema = createInsertSchema(feedback)
