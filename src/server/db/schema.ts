import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  jsonb,
} from 'drizzle-orm/pg-core'

// ─── Users ──────────────────────────────────────────────────────────────────
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name'),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ─── Profiles ────────────────────────────────────────────────────────────────
export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  // Education (Step 1)
  educationLevel: text('education_level'), // '10th'|'12th'|'diploma'|'ug'|'pg'|'working'
  stream: text('stream'),
  subjects: jsonb('subjects').$type<string[]>().default([]),
  graduationYear: integer('graduation_year'),

  // Skills & Interests (Step 2)
  skills: jsonb('skills')
    .$type<{ name: string; selfRating: number; source: 'onboarding' | 'added' | 'inferred' }[]>()
    .default([]),
  interests: jsonb('interests').$type<string[]>().default([]),
  hobbies: jsonb('hobbies').$type<string[]>().default([]),
  languages: jsonb('languages').$type<string[]>().default([]),
  certifications: jsonb('certifications').$type<string[]>().default([]),

  // Work Context (Step 3)
  workExperienceMonths: integer('work_experience_months').default(0),
  jobFunction: text('job_function'),
  workHistory: jsonb('work_history')
    .$type<{ title: string; company: string; months: number }[]>()
    .default([]),
  preferredWorkMode: text('preferred_work_mode'), // 'remote'|'hybrid'|'on-site'|'freelance'
  targetLocation: text('target_location'),

  // Goals (Step 4)
  primaryGoal: text('primary_goal'), // 'explore'|'find-job'|'upskill'|'side-income'|'higher-ed'
  incomeGoalINR: integer('income_goal_inr'),
  timeline: text('timeline'), // '3months'|'6months'|'1year'
  preferredLearningStyle: text('preferred_learning_style'),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  lastUpdated: timestamp('last_updated').defaultNow().notNull(),
})

// ─── Conversations ───────────────────────────────────────────────────────────
export const conversations = pgTable('conversations', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull().default('New Conversation'),
  topicTag: text('topic_tag'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ─── Messages ────────────────────────────────────────────────────────────────
export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  conversationId: uuid('conversation_id')
    .notNull()
    .references(() => conversations.id, { onDelete: 'cascade' }),
  role: text('role').$type<'user' | 'assistant'>().notNull(),
  content: text('content').notNull(),
  structuredData: jsonb('structured_data').$type<{
    careerSuggestions?: { title: string; matchScore: number; description: string }[]
    skillGaps?: { skill: string; priority: number; estimatedHours: number }[]
    salaryRanges?: { entry: number; mid: number; senior: number; currency: string }
    nextSteps?: string[]
    resourceQueryHints?: string[]
  }>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// ─── Saved Careers ───────────────────────────────────────────────────────────
export const savedCareers = pgTable('saved_careers', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  careerTitle: text('career_title').notNull(),
  matchScore: integer('match_score'),
  skillGapPercent: integer('skill_gap_percent'),
  salaryRange: jsonb('salary_range').$type<{
    entry: number
    mid: number
    senior: number
  }>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// ─── Saved Resources ─────────────────────────────────────────────────────────
export const savedResources = pgTable('saved_resources', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  resourceType: text('resource_type')
    .$type<'video' | 'article' | 'course' | 'wiki'>()
    .notNull(),
  title: text('title').notNull(),
  url: text('url').notNull(),
  platform: text('platform'),
  duration: text('duration'),
  isFree: text('is_free').$type<'free' | 'paid'>().default('free'),
  description: text('description'),
  thumbnailUrl: text('thumbnail_url'),
  status: text('status')
    .$type<'new' | 'in_progress' | 'completed'>()
    .default('new'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// ─── Skill Progress ──────────────────────────────────────────────────────────
export const skillProgress = pgTable('skill_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  skillName: text('skill_name').notNull(),
  currentLevel: integer('current_level').default(0), // 0–100
  targetLevel: integer('target_level').default(100),
  lastUpdated: timestamp('last_updated').defaultNow().notNull(),
})

// ─── AI Response Feedback ────────────────────────────────────────────────────
export const feedback = pgTable('feedback', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  messageId: uuid('message_id')
    .notNull()
    .references(() => messages.id, { onDelete: 'cascade' }),
  rating: text('rating').$type<'positive' | 'negative'>().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
