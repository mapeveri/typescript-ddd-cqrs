import { NestFactory } from '@nestjs/core';
import express from 'express';
import { createServer, Server } from 'http';
import createApp from './app';
import { AppModule } from './app.module';
import { LOGGER_INTERFACE } from './shared/domain/loggerInterface';

async function bootstrap() {
  const port = process.env.SERVER_PORT || 4000;

  const app = await NestFactory.create(AppModule, { cors: true });
  const expressApp: express.Express = await createApp();
  const server: Server = createServer(expressApp);

  const logger = app.get(LOGGER_INTERFACE);

  await app.init();
  server.listen(port, () => {
    logger.info(`App is running at http://localhost:${port} in ${process.env.NODE_ENV} mode`);
    console.log('Press CTRL-C to stop\n');
  });
}
bootstrap();
