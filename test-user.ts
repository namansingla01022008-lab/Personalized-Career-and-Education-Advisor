import { db } from './src/server/db'
import { users } from './src/server/db/schema'

async function test() {
  console.log('🧪 Testing manual user creation...')
  try {
    await db.insert(users).values({
      id: 'test-user-id',
      name: 'Test User',
      email: 'test' + Math.random() + '@example.com',
      // BetterAuth will provide these, let's see if our DB accepts them
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    console.log('✅ Manual user creation succeeded!')
  } catch (e) {
    console.error('❌ Manual user creation failed:', e)
  }
  process.exit(0)
}

test()
