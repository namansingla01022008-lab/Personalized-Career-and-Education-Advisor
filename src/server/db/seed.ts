/**
 * Seed script — run with: npm run db:seed
 * Inserts one test user + profile to verify DB connectivity.
 * Safe to run multiple times (checks for existing email).
 */
import 'dotenv/config'
import { db } from './index'
import { users, profiles } from './schema'
import { eq } from 'drizzle-orm'

async function seed() {
  console.log('🌱 Seeding database...')

  const TEST_EMAIL = 'test@pathwise.dev'

  // Avoid duplicate on re-run
  const existing = await db.query.users.findFirst({
    where: eq(users.email, TEST_EMAIL),
  })

  if (existing) {
    console.log('ℹ️  Test user already exists — skipping insert.')
    console.log('   User ID:', existing.id)
    process.exit(0)
  }

  const [user] = await db
    .insert(users)
    .values({
      email: TEST_EMAIL,
      name: 'Test User',
    })
    .returning()

  await db.insert(profiles).values({
    userId: user.id,
    educationLevel: 'ug',
    stream: 'Computer Science',
    skills: [
      { name: 'JavaScript', selfRating: 3, source: 'onboarding' },
      { name: 'Python', selfRating: 2, source: 'onboarding' },
    ],
    primaryGoal: 'find-job',
    incomeGoalINR: 50000,
    timeline: '6months',
  })

  console.log('✅ Seed complete!')
  console.log('   User ID:', user.id)
  console.log('   Email:  ', TEST_EMAIL)
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
