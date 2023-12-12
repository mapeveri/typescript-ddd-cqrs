import { Module } from '@nestjs/common';
import { controllers } from './controllers';
import { services } from './services';
import { repositories } from './repositories';
import { commands } from './commandHandlers';
import { queries } from './queryHandlers';
import { events } from './eventHandlers';
import { projections } from '@src/languages/infrastructure/nestjs/projectionHandlers';
import { readLayers } from '@src/languages/infrastructure/nestjs/readLayers';

@Module({
  imports: [],
  controllers,
  providers: [...services, ...commands, ...queries, ...events, ...projections, ...repositories, ...readLayers],
})
export class LanguageModule {}
