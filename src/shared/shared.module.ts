import { Global, Module } from '@nestjs/common';
import { COMMAND_BUS } from '@src/shared/domain/buses/commandBus/commandBus';
import { LOGGER_INTERFACE } from '@src/shared/domain/loggerInterface';
import { ASYNC_EVENT_BUS, EVENT_BUS } from '@src/shared/domain/buses/eventBus/eventBus';
import { NestJwtAuthGuard } from '@src/shared/infrastructure/api/guards/nestJwtAuthGuard';
import { JwtStrategy } from '@src/shared/infrastructure/auth/strategies/jwtStrategy';
import { JwtModule } from '@nestjs/jwt';
import { CqrsModule } from '@nestjs/cqrs';
import { QUERY_BUS } from '@src/shared/domain/buses/queryBus/queryBus';
import { PROJECTION_BUS } from '@src/shared/domain/buses/projectionBus/projectionBus';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { rabbitMqConfig } from '@src/shared/infrastructure/messenger/rabbitMq/config';
import { consumers } from '@src/shared/_dependencyInjection/consumers';
import { controllers } from '@src/shared/_dependencyInjection/controllers';
import { services } from '@src/shared/_dependencyInjection/services';
import Environment from '@src/shared/infrastructure/utils/environment';

@Global()
@Module({
  imports: [
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
  controllers: [...controllers, ...consumers],
  providers: [...services],
  exports: [
    NestJwtAuthGuard,
    JwtModule,
    CqrsModule,
    ClientsModule,
    JwtStrategy,
    LOGGER_INTERFACE,
    QUERY_BUS,
    COMMAND_BUS,
    EVENT_BUS,
    PROJECTION_BUS,
    ASYNC_EVENT_BUS,
  ],
})
export class SharedModule {}
