import bodyParser from 'body-parser';
import express, { Router } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import methodOverride from 'method-override';

import getContainer from './shared/infrastructure/dependencyInjection/container';
import { registerRoutes } from './languages/infrastructure/ui/api/v1/router';
import AppDataSource from './shared/infrastructure/persistence/typeOrm/dataSource';
import { registerCommands } from './shared/infrastructure/buses/registerCommands';
import { registerQueries } from './shared/infrastructure/buses/registerQueries';
import errorHandler from './shared/infrastructure/express/errorHandler';
import { registerEvents } from './shared/infrastructure/buses/registerEvents';
import { ExpressApp } from './shared/infrastructure/express/expressApp';

async function createApp(): Promise<ExpressApp> {
  const app: ExpressApp = express() as ExpressApp;

  app.locals.sourcePath = __dirname;
  app.set('env', process.env.NODE_ENV);
  app.isProduction = () => {
    return app.get('env') === 'production';
  };

  const corsOptions: object = {
    origin: process.env.FRONTED_URL,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

  const container = await getContainer(app);
  app.locals.container = container;
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(methodOverride('X-HTTP-Method-Override'));

  await AppDataSource.initialize();

  registerQueries(container);
  registerCommands(container);
  registerEvents(container);

  const apiRouter: Router = express.Router();
  registerRoutes(apiRouter, container);
  app.use('/api/v1/', apiRouter);

  app.use(errorHandler);

  return app;
}

export default createApp;
