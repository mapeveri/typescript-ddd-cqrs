import { NestJwtAuthGuard } from '@src/shared/infrastructure/auth/jwt/nestJwtAuthGuard';
import { JwtStrategy } from '@src/shared/infrastructure/auth/jwt/jwtStrategy';
import { APP_FILTER } from '@nestjs/core';
import { NestErrorFilter } from '@src/shared/infrastructure/exceptions/nestErrorFilter';
import { LOGGER } from '@src/shared/domain/services/logger';
import NestLogger from '@src/shared/infrastructure/services/nestLogger';
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
import NestJwtM2mTokenGenerator from '@src/shared/infrastructure/auth/jwt/nestJwtM2mTokenGenerator';
import { UuidIdentityProvider } from '@src/shared/infrastructure/services/uuidIdentityProvider';
import { IDENTITY_PROVIDER } from '@src/shared/domain/services/identityProvider';

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
  {
    provide: IDENTITY_PROVIDER,
    useClass: UuidIdentityProvider,
  },
  MongoEventStoreRepository,
  PersistDomainEventsSubscriber,
  NestJwtTokenGenerator,
  NestJwtM2mTokenGenerator,
];
