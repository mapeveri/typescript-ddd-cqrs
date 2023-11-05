import { Global, Module } from '@nestjs/common';
import { COMMAND_BUS } from '@src/shared/domain/buses/commandBus/commandBus';
import { LOGGER_INTERFACE } from '@src/shared/domain/loggerInterface';
import NestCommandBus from './buses/nestCommandBus';
import NestEventBus from './buses/nestEventBus';
import { EVENT_BUS } from '@src/shared/domain/buses/eventBus/eventBus';
import Logger from './logger/logger';
import { JwtAuthGuard } from './guards/JwtAuthGuard';
import { JwtStrategy } from './strategies/JwtStrategy';
import { JwtModule } from '@nestjs/jwt';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './filters/ErrorFilter';
import { CqrsModule } from '@nestjs/cqrs';
import { QUERY_BUS } from '@src/shared/domain/buses/queryBus/queryBus';
import NestQueryBusBus from './buses/nestQueryBus';
import { SseService } from '../sse/sse.service';
import { SseController } from '../sse/sse.controller';
import { UnhandledExceptionsBusHandler } from './buses/errors/unhandledExceptionsBusHandler';
import { EVENT_STORE_REPOSITORY } from '@src/shared/domain/eventStore/eventStoreRepository';
import MongoEventStoreRepository from '../persistence/mongo/repositories/mongoEventStoreRepository';
import { PersistEventsHandler } from './buses/events/persistEventsHandler';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
    CqrsModule,
  ],
  controllers: [SseController],
  providers: [
    SseService,
    UnhandledExceptionsBusHandler,
    JwtAuthGuard,
    JwtStrategy,
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
    {
      provide: LOGGER_INTERFACE,
      useClass: Logger,
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
      provide: QUERY_BUS,
      useClass: NestQueryBusBus,
    },
    {
      provide: EVENT_STORE_REPOSITORY,
      useClass: MongoEventStoreRepository,
    },
    PersistEventsHandler,
  ],
  exports: [JwtAuthGuard, JwtModule, CqrsModule, JwtStrategy, LOGGER_INTERFACE, QUERY_BUS, COMMAND_BUS, EVENT_BUS],
})
export class SharedModule {}
