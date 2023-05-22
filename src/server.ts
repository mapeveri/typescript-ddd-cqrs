import express from 'express';
import createApp from './app';

const port = process.env.SERVER_PORT;

createApp().then(async (app: express.Express) => {
  app.listen(port, () => {
    const logger = app.locals.container.get('Shared.Logger');

    logger.info(`App is running at http://localhost:${port} in ${app.get('env')} mode`);
    console.log('Press CTRL-C to stop\n');
  });
});
