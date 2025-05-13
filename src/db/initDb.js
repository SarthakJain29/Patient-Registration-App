// db/initDb.js
import { PGlite } from '@electric-sql/pglite';

const db = new PGlite();

const initDb = async () => {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      gender TEXT CHECK(gender IN ('Male', 'Female', 'Other')),
      symptoms TEXT,
      registered_date TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

export { db, initDb };
