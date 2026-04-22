import { db } from './src/server/db'
import { sql } from 'drizzle-orm'

async function check() {
  console.log('🔍 Checking account table columns...')
  const result = await db.execute(sql`
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_name = 'account'
  `)
  console.table(result.rows)
  process.exit(0)
}

check().catch((e) => {
  console.error(e)
  process.exit(1)
})
