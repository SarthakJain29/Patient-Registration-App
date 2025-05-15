import { PGliteWorker } from '@electric-sql/pglite/worker';

let dbInstance = null;

export const getDb = async () => {
  if (!dbInstance) {
    const worker = new Worker(
      new URL('./pglite-worker.js', import.meta.url),
      { type: 'module' }
    );

    dbInstance = await PGliteWorker.create(worker, {
      dataDir: 'idb://patient-db', // Enables persistence
    });

    await dbInstance.exec(`
      CREATE TABLE IF NOT EXISTS patients (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        age INTEGER NOT NULL,
        gender TEXT CHECK(gender IN ('Male', 'Female', 'Other')),
        symptoms TEXT,
        registered_date TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  return dbInstance;
};

export const initDb = async () => {
  await getDb(); // just initialize
};
export const notifyDataChange = () => {
  localStorage.setItem('patient_db_updated', Date.now().toString());
  window.dispatchEvent(new CustomEvent('patient_db_updated'));
};
export { dbInstance as db };
