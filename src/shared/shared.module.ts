import { Global, Module, OnApplicationShutdown } from '@nestjs/common';
import { COMMAND_BUS } from '@src/shared/domain/bus/commandBus/commandBus';
import { LOGGER } from '@src/shared/domain/services/logger';
import { ASYNC_EVENT_BUS, EVENT_BUS } from '@src/shared/domain/bus/eventBus/eventBus';
import { NestJwtAuthGuard } from '@src/shared/infrastructure/auth/jwt/nestJwtAuthGuard';
import { JwtStrategy } from '@src/shared/infrastructure/auth/jwt/jwtStrategy';
import { JwtModule } from '@nestjs/jwt';
import { CqrsModule } from '@nestjs/cqrs';
import { QUERY_BUS } from '@src/shared/domain/bus/queryBus/queryBus';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { rabbitMqConfig } from '@src/shared/infrastructure/messenger/rabbitMq/config';
import { consumers } from '@src/shared/_dependencyInjection/consumers';
import { services } from '@src/shared/_dependencyInjection/services';
import Environment from '@src/shared/infrastructure/utils/environment';
import MongoConnection, { MONGO_CLIENT } from '@src/shared/infrastructure/persistence/mongo/mongoConnection';
import { ConfigModule } from '@nestjs/config';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import NestJwtTokenGenerator from '@src/shared/infrastructure/auth/jwt/nestJwtTokenGenerator';
import NestJwtM2mTokenGenerator from '@src/shared/infrastructure/auth/jwt/nestJwtM2mTokenGenerator';
import { IDENTITY_PROVIDER } from '@src/shared/domain/services/identityProvider';
import { DiscoveryModule } from '@nestjs/core';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: Environment.getVariable('JWT_SECRET'),
      signOptions: { expiresIn: '2h' },
    }),
    ClientsModule.register([
      {
        name: 'RABBITMQ_CLIENT',
        transport: Transport.RMQ,
        options: rabbitMqConfig,
      },
    ]),
    CqrsModule,
    DiscoveryModule,
  ],
  controllers: [...consumers],
  providers: [...services],
  exports: [
    DiscoveryModule,
    NestJwtAuthGuard,
    JwtModule,
    CqrsModule,
    ClientsModule,
    JwtStrategy,
    NestJwtTokenGenerator,
    NestJwtM2mTokenGenerator,
    MONGO_CLIENT,
    LOGGER,
    IDENTITY_PROVIDER,
    QUERY_BUS,
    COMMAND_BUS,
    EVENT_BUS,
    ASYNC_EVENT_BUS,
  ],
})
export class SharedModule implements OnApplicationShutdown {
  constructor(@Inject(MONGO_CLIENT) private mongoConnection: MongoConnection) {}

  async onApplicationShutdown(): Promise<void> {
    await this.mongoConnection.disconnect();
  }
}
