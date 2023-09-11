import { Global, Module } from '@nestjs/common';
import { COMMAND_BUS } from '@src/shared/domain/buses/commandBus/commandBus';
import { LOGGER_INTERFACE } from '@src/shared/domain/loggerInterface';
import NestCommandBus from './buses/nestCommandBus';
import NestEventBus from './buses/nestEventBus';
import { EVENT_BUS } from '@src/shared/domain/buses/eventBus/eventBus';
import Logger from '../logger';
import { JwtAuthGuard } from './guards/JwtAuthGuard';
import { JwtStrategy } from './strategies/JwtStrategy';
import { JwtModule } from '@nestjs/jwt';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './filters/ErrorFilter';
import { CqrsModule, UnhandledExceptionBus } from '@nestjs/cqrs';
import { QUERY_BUS } from '@src/shared/domain/buses/queryBus/queryBus';
import NestQueryBusBus from './buses/nestQueryBus';
import { Subject, takeUntil } from 'rxjs';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
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
  ],
  exports: [JwtAuthGuard, JwtModule, CqrsModule, JwtStrategy, LOGGER_INTERFACE, QUERY_BUS, COMMAND_BUS, EVENT_BUS],
})
export class SharedModule {
  private destroy$ = new Subject<void>();

  constructor(private unhandledExceptionsBus: UnhandledExceptionBus) {
    this.unhandledExceptionsBus.pipe(takeUntil(this.destroy$)).subscribe((exceptionInfo) => {
      console.log(exceptionInfo.exception);
      console.log(exceptionInfo.cause);
    });
  }

  onModuleDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
