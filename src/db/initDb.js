// db/initDb.js
import { PGlite } from '@electric-sql/pglite';

const db = new PGlite('idb://patient-db');

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
  `);
};

export { db, initDb };
