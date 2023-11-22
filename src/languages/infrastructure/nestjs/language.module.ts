import { Module } from '@nestjs/common';
import { controllers } from './controllers';
import { services } from './services';
import { repositories } from './repositories';
import { commands } from './commandHandlers';
import { queries } from './queryHandlers';
import { events } from './eventHandlers';

@Module({
  imports: [],
  controllers,
  providers: [...services, ...commands, ...queries, ...events, ...repositories],
})
export class LanguageModule {}
