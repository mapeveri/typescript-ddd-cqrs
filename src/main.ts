import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Logger, { LOGGER } from './shared/domain/services/logger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.SERVER_PORT || 4000;

  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();

  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
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

  const logger: Logger = app.get(LOGGER);

  await app.init();

  await app.listen(port, () => {
    logger.log(`App is running at http://localhost:${port} in ${process.env.NODE_ENV} mode`);
    console.log('Press CTRL-C to stop\n');
  });
}

void bootstrap();
