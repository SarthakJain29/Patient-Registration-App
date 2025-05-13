import { PGlite } from '@electric-sql/pglite'

const db = new PGlite()

await db.exec(`
    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      age INTEGER,
      gender TEXT CHECK(gender IN ('Male', 'Female', 'Other')),
      symptoms TEXT,
      registered_date TEXT
    )
  `);

export default db;