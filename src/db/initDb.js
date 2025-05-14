// db/initDb.js
import { PGliteWorker } from '@electric-sql/pglite/worker';

let dbInstance = null;

const getDb = async () => {
  if (!dbInstance) {
    try {
      // Create a new worker instance
      const worker = new Worker(
        new URL('./pglite-worker.js', import.meta.url),
        { type: 'module' }
      );

      // Create a new PGliteWorker instance
      dbInstance = new PGliteWorker(worker);

      // Initialize the database schema
      await dbInstance.exec(`
        CREATE TABLE IF NOT EXISTS patients (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          age INTEGER NOT NULL,
          gender TEXT CHECK(gender IN ('Male', 'Female', 'Other')),
          symptoms TEXT,
          registered_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Failed to initialize database:', error);
      dbInstance = null;
      throw error;
    }
  }
  
  return dbInstance;
};

export { getDb };
