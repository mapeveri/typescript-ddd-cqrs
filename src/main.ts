import { NestFactory } from '@nestjs/core';
import express from 'express';
import { createServer, Server } from 'http';
import createApp from './app';
import { AppModule } from './app.module';
import Logger from './shared/infrastructure/logger';

async function bootstrap() {
  const port = process.env.SERVER_PORT || 4000;

  const app = await NestFactory.create(AppModule, { cors: true });
  const expressApp: express.Express = await createApp();
  const server: Server = createServer(expressApp);

  const logger = expressApp.locals.container.get(Logger);

  await app.init();
  server.listen(port, () => {
    logger.info(`App is running at http://localhost:${port} in ${app.get('env')} mode`);
    console.log('Press CTRL-C to stop\n');
  });
}
bootstrap();
