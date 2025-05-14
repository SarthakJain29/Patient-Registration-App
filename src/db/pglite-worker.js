// db/pglite-worker.js
import { PGlite } from '@electric-sql/pglite';
import { worker } from '@electric-sql/pglite/worker';

// This file is a Web Worker entry point. It should only contain this:
worker({
  async init(options) {
    return new PGlite({
      dataDir: options.dataDir,
    });
  },
});
