import express from 'express';
import createApp from './app';
import Logger from './shared/infrastructure/logger';

const port = process.env.SERVER_PORT;
const app: Promise<express.Express> = createApp();

app.then(async (app: express.Express) => {
  app.listen(port, () => {
    const logger = app.locals.container.get(Logger);

    logger.info(`App is running at http://localhost:${port} in ${app.get('env')} mode`);
    console.log('Press CTRL-C to stop\n');
  });
});
