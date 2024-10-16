import { Global, Module } from '@nestjs/common';
import { COMMAND_BUS } from '@src/shared/domain/bus/commandBus/commandBus';
import { LOGGER } from '@src/shared/domain/logger';
import { ASYNC_EVENT_BUS, EVENT_BUS } from '@src/shared/domain/bus/eventBus/eventBus';
import { NestJwtAuthGuard } from '@src/shared/guards/nestJwtAuthGuard';
import { JwtStrategy } from '@src/shared/infrastructure/auth/strategies/jwtStrategy';
import { JwtModule } from '@nestjs/jwt';
import { CqrsModule } from '@nestjs/cqrs';
import { QUERY_BUS } from '@src/shared/domain/bus/queryBus/queryBus';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { rabbitMqConfig } from '@src/shared/infrastructure/messenger/rabbitMq/config';
import { consumers } from '@src/shared/_dependencyInjection/consumers';
import { services } from '@src/shared/_dependencyInjection/services';
import Environment from '@src/shared/infrastructure/utils/environment';
import { SOCIAL_AUTHENTICATOR } from '@src/shared/domain/auth/socialAuthenticator';
import { MONGO_CLIENT } from '@src/shared/infrastructure/persistence/mongo/mongoConnection';
import { ConfigModule } from '@nestjs/config';

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
  ],
  controllers: [...consumers],
  providers: [...services],
  exports: [
    NestJwtAuthGuard,
    JwtModule,
    CqrsModule,
    ClientsModule,
    JwtStrategy,
    MONGO_CLIENT,
    LOGGER,
    QUERY_BUS,
    COMMAND_BUS,
    EVENT_BUS,
    ASYNC_EVENT_BUS,
    SOCIAL_AUTHENTICATOR,
  ],
})
export class SharedModule {}
