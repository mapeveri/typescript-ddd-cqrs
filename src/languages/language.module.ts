import { Module } from '@nestjs/common';
import { controllers } from '@src/languages/_dependencyInjection/controllers';
import { services } from '@src/shared/_dependencyInjection/services';
import { repositories } from '@src/languages/_dependencyInjection/repositories';
import { commands } from '@src/languages/_dependencyInjection/commandHandlers';
import { queries } from '@src/languages/_dependencyInjection/queryHandlers';
import { events } from '@src/languages/_dependencyInjection/eventHandlers';
import { projections } from '@src/languages/_dependencyInjection/projectionHandlers';
import { readLayers } from '@src/languages/_dependencyInjection/readLayers';

@Module({
  imports: [],
  controllers: [...controllers],
  providers: [...services, ...commands, ...queries, ...events, ...projections, ...repositories, ...readLayers],
})
export class LanguageModule {}
