import path from 'path';

import 'ts-node/register';
import 'tsconfig-paths/register';

process.env.NODE_ENV = 'test';

const envTestPath = `${path.dirname(__dirname)}/.env.test`;
require('dotenv').config({ path: envTestPath, override: true });

process.on('unhandledRejection', (reason) => {
  console.warn('Unhandled rejection detected:', reason);
});
