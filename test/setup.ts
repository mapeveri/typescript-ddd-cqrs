import path from 'path';

process.env.NODE_ENV = 'test';

const envTestPath = `${path.dirname(__dirname)}/.env.test`;
require('dotenv').config({ path: envTestPath });
