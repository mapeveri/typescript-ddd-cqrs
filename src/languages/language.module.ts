import { Module } from '@nestjs/common';
import { controllers } from '@src/languages/_dependencyInjection/controllers';
import { repositories } from '@src/languages/_dependencyInjection/repositories';
import { commands } from '@src/languages/_dependencyInjection/commandHandlers';
import { queries } from '@src/languages/_dependencyInjection/queryHandlers';
import { events } from '@src/languages/_dependencyInjection/eventHandlers';
import { projections } from '@src/languages/_dependencyInjection/projectionHandlers';
import { readModels } from '@src/languages/_dependencyInjection/readModels';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { entitySchemas } from '@src/languages/_dependencyInjection/entitySchemas';
import mikroOrmConfiguration from './infrastructure/persistence/mikroOrm/config';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { services } from '@src/languages/_dependencyInjection/services';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfiguration),
    MikroOrmModule.forFeature(entitySchemas),
    ConfigModule.forRoot(),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get('SERVER_URL'),
        timeout: 5000,
      }),
    }),
  ],
  exports: [],
  controllers: [...controllers],
  providers: [...commands, ...queries, ...events, ...projections, ...services, ...repositories, ...readModels],
})
export class LanguageModule {}
