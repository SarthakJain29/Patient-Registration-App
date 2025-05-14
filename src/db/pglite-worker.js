// db/pglite-worker.js
import { PGlite } from '@electric-sql/pglite';
import { worker } from '@electric-sql/pglite/worker';

// Initialize the worker with default configuration
worker({
  async init() {
    return new PGlite();
  }
});
