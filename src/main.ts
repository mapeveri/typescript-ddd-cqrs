import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LOGGER_INTERFACE } from './shared/domain/loggerInterface';
import { DataSourceHandler } from './shared/infrastructure/persistence/typeOrm/dataSourceHandler';
import { configureQueryBus } from './shared/infrastructure/buses/configureQueryBus';
import { configureCommandBus } from './shared/infrastructure/buses/configureCommandBus';
import { configureEventBus } from './shared/infrastructure/buses/configureEventBus';

async function bootstrap() {
  const port = process.env.SERVER_PORT || 4000;

  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api/v1');

  await DataSourceHandler.getInstance().initialize();

  await configureQueryBus();
  await configureCommandBus();
  await configureEventBus();

  const logger = app.get(LOGGER_INTERFACE);

  await app.init();
  
  app.listen(port, () => {
    logger.info(`App is running at http://localhost:${port} in ${process.env.NODE_ENV} mode`);
    console.log('Press CTRL-C to stop\n');
  });
}
bootstrap();
