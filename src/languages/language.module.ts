import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { controllers } from '@src/languages/_dependencyInjection/controllers';
import { repositories } from '@src/languages/_dependencyInjection/repositories';
import { commands } from '@src/languages/_dependencyInjection/commandHandlers';
import { queries } from '@src/languages/_dependencyInjection/queryHandlers';
import { events } from '@src/languages/_dependencyInjection/eventHandlers';
import { projections } from '@src/languages/_dependencyInjection/projectionHandlers';
import { readLayers } from '@src/languages/_dependencyInjection/readLayers';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { entitySchemas } from '@src/shared/_dependencyInjection/entitySchemas';

@Module({
  imports: [TypeOrmModule.forFeature([]), MikroOrmModule.forFeature(entitySchemas)],
  exports: [TypeOrmModule],
  controllers: [...controllers],
  providers: [...commands, ...queries, ...events, ...projections, ...repositories, ...readLayers],
})
export class LanguageModule {}
