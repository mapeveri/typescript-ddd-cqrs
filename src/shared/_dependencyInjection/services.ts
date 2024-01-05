import { SOCIAL_AUTHENTICATOR } from '@src/languages/domain/auth/socialAuthenticator';
import GoogleSocialAuthenticator from '@src/languages/infrastructure/oauth/googleSocialAuthenticator';
import { NestJwtAuthGuard } from '@src/shared/infrastructure/api/guards/nestJwtAuthGuard';
import { JwtStrategy } from '@src/shared/infrastructure/auth/strategies/jwtStrategy';
import { APP_FILTER } from '@nestjs/core';
import { NestErrorFilter } from '@src/shared/infrastructure/api/filters/nestErrorFilter';
import { LOGGER_INTERFACE } from '@src/shared/domain/loggerInterface';
import NestLogger from '@src/shared/infrastructure/logger/nestLogger';
import { COMMAND_BUS } from '@src/shared/domain/buses/commandBus/commandBus';
import NestCommandBus from '@src/shared/infrastructure/bus/nestCommandBus';
import { ASYNC_EVENT_BUS, EVENT_BUS } from '@src/shared/domain/buses/eventBus/eventBus';
import NestEventBus from '@src/shared/infrastructure/bus/nestEventBus';
import { RabbitMqEventBus } from '@src/shared/infrastructure/bus/rabbitMq/rabbitMqEventBus';
import { QUERY_BUS } from '@src/shared/domain/buses/queryBus/queryBus';
import NestQueryBusBus from '@src/shared/infrastructure/bus/nestQueryBus';
import { PROJECTION_BUS } from '@src/shared/domain/buses/projectionBus/projectionBus';
import NestProjectionBus from '@src/shared/infrastructure/bus/nestProjectionBus';
import { EVENT_STORE_REPOSITORY } from '@src/shared/domain/eventStore/eventStoreRepository';
import MongoEventStoreRepository from '@src/shared/infrastructure/persistence/mongo/repositories/mongoEventStoreRepository';
import { PersistDomainEventsSuscriber } from '@src/shared/infrastructure/subscribers/persistDomainEventsSuscriber';

export const services = [
  NestJwtAuthGuard,
  JwtStrategy,
  {
    provide: APP_FILTER,
    useClass: NestErrorFilter,
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
    useExisting: NestProjectionBus,
  },
  {
    provide: EVENT_STORE_REPOSITORY,
    useClass: MongoEventStoreRepository,
  },
  PersistDomainEventsSuscriber,
  {
    provide: SOCIAL_AUTHENTICATOR,
    useClass: GoogleSocialAuthenticator,
  },
];
