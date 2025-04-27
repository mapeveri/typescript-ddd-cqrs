import { Module } from '@nestjs/common';
import { controllers } from '@src/language/_dependencyInjection/controllers';
import { repositories } from '@src/language/_dependencyInjection/repositories';
import { commands } from '@src/language/_dependencyInjection/commandHandlers';
import { queries } from '@src/language/_dependencyInjection/queryHandlers';
import { events } from '@src/language/_dependencyInjection/eventHandlers';
import { projections } from '@src/language/_dependencyInjection/projectionHandlers';
import { readModels } from '@src/language/_dependencyInjection/readModels';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { services } from '@src/language/_dependencyInjection/services';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { entitySchemas as languageEntitySchemas } from '@src/language/_dependencyInjection/entitySchemas';
import { MIKRO_ORM_CONTEXT_NAME, mikroOrmConfiguration } from '@src/language/mikroOrmConfig';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot(mikroOrmConfiguration),
    MikroOrmModule.forFeature(languageEntitySchemas, 'language'),
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
export class LanguageModule {
  static mikroOrmContext = MIKRO_ORM_CONTEXT_NAME;
}
