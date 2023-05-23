import { Express } from 'express';

export interface ExpressApp extends Express {
  isProduction: () => boolean;
}
