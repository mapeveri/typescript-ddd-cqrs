import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { controllers } from '@src/languages/_dependencyInjection/controllers';
import { services } from '@src/shared/_dependencyInjection/services';
import { repositories } from '@src/languages/_dependencyInjection/repositories';
import { commands } from '@src/languages/_dependencyInjection/commandHandlers';
import { queries } from '@src/languages/_dependencyInjection/queryHandlers';
import { events } from '@src/languages/_dependencyInjection/eventHandlers';
import { projections } from '@src/languages/_dependencyInjection/projectionHandlers';
import { readLayers } from '@src/languages/_dependencyInjection/readLayers';
import { services as LanguageServices } from '@src/languages/_dependencyInjection/services';
import NestProjectionBus from '@src/shared/infrastructure/bus/nestProjectionBus';

@Module({
  imports: [],
  controllers: [...controllers],
  providers: [
    ...services,
    ...commands,
    ...queries,
    ...events,
    ...projections,
    ...repositories,
    ...readLayers,
    ...LanguageServices,
  ],
})
export class LanguageModule implements OnApplicationBootstrap {
  constructor(private readonly projectionBus: NestProjectionBus) {}
  onApplicationBootstrap() {
    this.projectionBus.register(projections);
  }
}
