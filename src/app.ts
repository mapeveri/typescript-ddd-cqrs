import bodyParser from 'body-parser';
import express, { Router } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import methodOverride from 'method-override';

import { configureApiRouter } from '@src/languages/infrastructure/ui/api/v1/router';
import { DataSourceHandler } from '@src/shared/infrastructure/persistence/typeOrm/dataSourceHandler';
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

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(methodOverride('X-HTTP-Method-Override'));

  await DataSourceHandler.getInstance().initialize();

  await configureQueryBus();
  await configureCommandBus();
  await configureEventBus();

  const apiRouter: Router = await configureApiRouter();
  app.use('/api/v1/', apiRouter);

  app.use(errorHandler);

  return app;
}

export default createApp;
