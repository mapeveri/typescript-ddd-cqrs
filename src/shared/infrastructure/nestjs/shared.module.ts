import { Global, Module } from '@nestjs/common';
import { COMMAND_BUS } from '@src/shared/domain/buses/commandBus/commandBus';
import { LOGGER_INTERFACE } from '@src/shared/domain/loggerInterface';
import MemoryCommandBus from '../buses/memoryCommandBus';
import { QUERY_BUS } from '@src/shared/domain/buses/queryBus/queryBus';
import MemoryQueryBus from '../buses/memoryQueryBus';
import { EVENT_BUS } from '@src/shared/domain/buses/eventBus/eventBus';
import MemoryEventBus from '../buses/memoryEventBus';
import Logger from '../logger';
import { JwtAuthGuard } from './guards/JwtAuthGuard';
import { JwtStrategy } from './strategies/JwtStrategy';
import { JwtModule } from '@nestjs/jwt';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './filters/ErrorFilter';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
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
      useClass: Logger,
    },
    {
      provide: COMMAND_BUS,
      useClass: MemoryCommandBus,
    },
    {
      provide: QUERY_BUS,
      useClass: MemoryQueryBus,
    },
    {
      provide: EVENT_BUS,
      useClass: MemoryEventBus,
    },
  ],
  exports: [JwtAuthGuard, JwtModule, JwtStrategy, LOGGER_INTERFACE, COMMAND_BUS, QUERY_BUS, EVENT_BUS],
})
export class SharedModule {}
