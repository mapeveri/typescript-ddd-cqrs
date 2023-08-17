import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LOGGER_INTERFACE } from './shared/domain/loggerInterface';
import { DataSourceHandler } from './shared/infrastructure/persistence/typeOrm/dataSourceHandler';
import { configureQueryBus } from './shared/infrastructure/buses/configureQueryBus';
import { configureCommandBus } from './shared/infrastructure/buses/configureCommandBus';
import { configureEventBus } from './shared/infrastructure/buses/configureEventBus';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.SERVER_PORT || 4000;

  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: process.env.FRONTED_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Languages')
    .setDescription('The languages API')
    .setVersion('1.0')
    .addTag('languages')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

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
