import path from 'path';

process.env.NODE_ENV = 'test';

const envTestPath = `${path.dirname(__dirname)}/.env.test`;
require('dotenv').config({ path: envTestPath, override: true });

process.on('unhandledRejection', (reason) => {
  console.warn('Unhandled rejection detected:', reason);
});
