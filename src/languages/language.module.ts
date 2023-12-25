import { Module } from '@nestjs/common';
import { controllers } from '../api/dependencyInjection/controllers';
import { services } from '../api/dependencyInjection/services';
import { repositories } from '../api/dependencyInjection/repositories';
import { commands } from '../api/dependencyInjection/commandHandlers';
import { queries } from '../api/dependencyInjection/queryHandlers';
import { events } from '../api/dependencyInjection/eventHandlers';
import { projections } from '@src/api/dependencyInjection/projectionHandlers';
import { readLayers } from '@src/api/dependencyInjection/readLayers';

@Module({
  imports: [],
  controllers,
  providers: [...services, ...commands, ...queries, ...events, ...projections, ...repositories, ...readLayers],
})
export class LanguageModule {}
