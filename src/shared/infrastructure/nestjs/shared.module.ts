import { Module } from '@nestjs/common';
import { COMMAND_BUS } from '@src/shared/domain/buses/commandBus/commandBus';
import { LOGGER_INTERFACE } from '@src/shared/domain/loggerInterface';
import MemoryCommandBus from '../buses/memoryCommandBus';
import { QUERY_BUS } from '@src/shared/domain/buses/queryBus/queryBus';
import MemoryQueryBus from '../buses/memoryQueryBus';
import { EVENT_BUS } from '@src/shared/domain/buses/eventBus/eventBus';
import MemoryEventBus from '../buses/memoryEventBus';
import Logger from '../logger';

@Module({
  imports: [],
  providers: [
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
  exports: [LOGGER_INTERFACE, COMMAND_BUS, QUERY_BUS, EVENT_BUS],
})
export class SharedModule {}
