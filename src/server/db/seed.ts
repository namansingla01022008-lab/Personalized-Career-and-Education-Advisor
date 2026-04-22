import { db } from './index'
import { users, profiles } from './schema'

async function seed() {
  console.log('Seeding database...')
  
  const [user] = await db.insert(users).values({
    email: 'test@pathwise.dev',
    name: 'Test User',
  }).returning()

  await db.insert(profiles).values({
    userId: user.id,
    educationLevel: 'ug',
    primaryGoal: 'find-job',
  })

  console.log('Seed complete. User ID:', user.id)
  process.exit(0)
}

seed().catch((err) => { console.error(err); process.exit(1) })
