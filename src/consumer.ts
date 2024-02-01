import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { rabbitMqConfig } from './shared/infrastructure/messenger/rabbitMq/config';
import { DataSourceHandler } from './shared/infrastructure/persistence/typeOrm/dataSourceHandler';

async function bootstrap() {
  const rabbitMq = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: rabbitMqConfig,
  });

  await DataSourceHandler.getInstance().initialize();

  await rabbitMq.listen();
}

void bootstrap();
