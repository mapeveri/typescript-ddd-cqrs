import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { rabbitMqConfig } from './shared/infrastructure/messenger/rabbitMq/config';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const port = process.env.SERVER_CONSUMER_PORT || 4001;

  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: rabbitMqConfig,
  });

  await app.startAllMicroservices();
  await app.listen(port);
}

void bootstrap();
