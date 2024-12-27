import { NestJwtAuthGuard } from '@src/shared/guards/nestJwtAuthGuard';
import { JwtStrategy } from '@src/shared/infrastructure/auth/strategies/jwtStrategy';
import { APP_FILTER } from '@nestjs/core';
import { NestErrorFilter } from '@src/shared/exceptions/nestErrorFilter';
import { LOGGER } from '@src/shared/domain/logger';
import NestLogger from '@src/shared/infrastructure/logger/nestLogger';
import { COMMAND_BUS } from '@src/shared/domain/bus/commandBus/commandBus';
import NestCommandBus from '@src/shared/infrastructure/bus/nestCommandBus';
import { ASYNC_EVENT_BUS, EVENT_BUS } from '@src/shared/domain/bus/eventBus/eventBus';
import NestEventBus from '@src/shared/infrastructure/bus/nestEventBus';
import { RabbitMqEventBus } from '@src/shared/infrastructure/bus/rabbitMq/rabbitMqEventBus';
import { QUERY_BUS } from '@src/shared/domain/bus/queryBus/queryBus';
import NestQueryBusBus from '@src/shared/infrastructure/bus/nestQueryBus';
import MongoEventStoreRepository from '@src/shared/infrastructure/persistence/mongo/repositories/mongoEventStoreRepository';
import { PersistDomainEventsSubscriber } from '@src/shared/infrastructure/subscribers/persistDomainEventsSubscriber';
import MongoConnection, { MONGO_CLIENT } from '@src/shared/infrastructure/persistence/mongo/mongoConnection';
import MikroOrmTransactionalDecorator from '../infrastructure/persistence/mikroOrm/decorators/mikroOrmTransactionalDecorator';
import NestJwtTokenGenerator from '@src/shared/infrastructure/auth/jwt/nestJwtTokenGenerator';

export const services = [
  MikroOrmTransactionalDecorator,
  NestJwtAuthGuard,
  JwtStrategy,
  {
    provide: MONGO_CLIENT,
    useFactory: async () => {
      return await MongoConnection.getInstance();
    },
  },
  {
    provide: APP_FILTER,
    useClass: NestErrorFilter,
  },
  {
    provide: LOGGER,
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
  MongoEventStoreRepository,
  PersistDomainEventsSubscriber,
  NestJwtTokenGenerator,
];
