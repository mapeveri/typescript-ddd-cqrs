import { Global, Module } from '@nestjs/common';
import { COMMAND_BUS } from '@src/shared/domain/buses/commandBus/commandBus';
import { LOGGER_INTERFACE } from '@src/shared/domain/loggerInterface';
import NestCommandBus from '@src/shared/infrastructure/bus/nestCommandBus';
import NestEventBus from '@src/shared/infrastructure/bus/nestEventBus';
import { ASYNC_EVENT_BUS, EVENT_BUS } from '@src/shared/domain/buses/eventBus/eventBus';
import NestLogger from '@src/shared/infrastructure/logger/nestLogger';
import { JwtAuthGuard } from '@src/api/guards/jwtAuthGuard';
import { JwtStrategy } from '@src/shared/infrastructure/auth/strategies/jwtStrategy';
import { JwtModule } from '@nestjs/jwt';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from '@src/api/filters/errorFilter';
import { CqrsModule } from '@nestjs/cqrs';
import { QUERY_BUS } from '@src/shared/domain/buses/queryBus/queryBus';
import NestQueryBusBus from '@src/shared/infrastructure/bus/nestQueryBus';
import { EVENT_STORE_REPOSITORY } from '@src/shared/domain/eventStore/eventStoreRepository';
import MongoEventStoreRepository from './infrastructure/persistence/mongo/repositories/mongoEventStoreRepository';
import { PersistDomainEventsSuscriber } from '@src/shared/infrastructure/subscribers/persistDomainEventsSuscriber';
import NestProjectionBus from '@src/shared/infrastructure/bus/nestProjectionBus';
import { PROJECTION_BUS } from '@src/shared/domain/buses/projectionBus/projectionBus';
import { RabbitMqEventBus } from '@src/shared/infrastructure/bus/rabbitMq/rabbitMqEventBus';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMqConsumer } from '@src/shared/infrastructure/bus/rabbitMq/rabbitMqConsumer';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
    ClientsModule.register([
      {
        name: 'RABBITMQ_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_HOST || ''],
          queue: process.env.RABBITMQ_EVENTS_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    CqrsModule,
  ],
  providers: [
    JwtAuthGuard,
    JwtStrategy,
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
    {
      provide: LOGGER_INTERFACE,
      useClass: NestLogger,
    },
    {
      provide: COMMAND_BUS,
      useClass: NestCommandBus,
    },
    {
      provide: EVENT_BUS,
      useClass: NestEventBus,
    },
    {
      provide: ASYNC_EVENT_BUS,
      useClass: RabbitMqEventBus,
    },
    {
      provide: QUERY_BUS,
      useClass: NestQueryBusBus,
    },
    {
      provide: PROJECTION_BUS,
      useClass: NestProjectionBus,
    },
    {
      provide: EVENT_STORE_REPOSITORY,
      useClass: MongoEventStoreRepository,
    },
    PersistDomainEventsSuscriber,
    RabbitMqConsumer,
  ],
  exports: [
    JwtAuthGuard,
    JwtModule,
    ClientsModule,
    CqrsModule,
    JwtStrategy,
    RabbitMqConsumer,
    LOGGER_INTERFACE,
    QUERY_BUS,
    COMMAND_BUS,
    EVENT_BUS,
    PROJECTION_BUS,
    ASYNC_EVENT_BUS,
  ],
})
export class SharedModule {}
