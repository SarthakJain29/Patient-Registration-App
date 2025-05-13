// db/initDb.js
import { PGliteWorker } from '@electric-sql/pglite/worker'

const db = await PGliteWorker.create(
  new Worker(new URL('./pglite-worker.js', import.meta.url), {
    type: 'module',
  }),
  {
    dataDir: 'idb://patient-db',
  }
)

const initDb = async () => {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS patients (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      gender TEXT CHECK(gender IN ('Male', 'Female', 'Other')),
      symptoms TEXT,
      registered_date TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `)
}

export { db, initDb }
