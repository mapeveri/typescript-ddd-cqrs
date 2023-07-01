import bodyParser from 'body-parser';
import express, { Router } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import methodOverride from 'method-override';

import configureContainer from '@src/shared/infrastructure/dependencyInjection/container';
import { configureApiRouter } from '@src/languages/infrastructure/ui/api/v1/router';
import { configureDatabase } from '@src/shared/infrastructure/persistence/typeOrm/dataSource';
import { configureCommandBus } from '@src/shared/infrastructure/buses/configureCommandBus';
import { configureQueryBus } from '@src/shared/infrastructure/buses/configureQueryBus';
import { configureEventBus } from '@src/shared/infrastructure/buses/configureEventBus';
import errorHandler from '@src/shared/infrastructure/express/errorHandler';
import { ExpressApp } from '@src/shared/infrastructure/express/expressApp';

async function createApp(): Promise<ExpressApp> {
  const app: ExpressApp = express() as ExpressApp;

  app.set('env', process.env.NODE_ENV);
  app.isProduction = () => {
    return app.get('env') === 'production';
  };
  app.locals.sourcePath = __dirname;

  const corsOptions: object = {
    origin: process.env.FRONTED_URL,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

  const container = await configureContainer(app);
  app.locals.container = container;
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(methodOverride('X-HTTP-Method-Override'));

  await configureDatabase();

  configureQueryBus(container);
  configureCommandBus(container);
  configureEventBus(container);

  const apiRouter: Router = configureApiRouter(container);
  app.use('/api/v1/', apiRouter);

  app.use(errorHandler);

  return app;
}

export default createApp;
