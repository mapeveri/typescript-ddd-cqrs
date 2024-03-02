import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { rabbitMqConfig } from './shared/infrastructure/messenger/rabbitMq/config';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const rabbitMq = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: rabbitMqConfig,
  });

  await rabbitMq.listen();
}

void bootstrap();
