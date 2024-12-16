import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfiguration from './infrastructure/persistence/mikroOrm/config';
import { entitySchemas } from '@src/account/_dependencyInjection/entitySchemas';
import { controllers } from '@src/account/_dependencyInjection/controllers';
import { commands } from '@src/account/_dependencyInjection/commandHandlers';
import { queries } from '@src/account/_dependencyInjection/queryHandlers';
import { repositories } from '@src/account/_dependencyInjection/repositories';

@Module({
  imports: [MikroOrmModule.forRoot(mikroOrmConfiguration), MikroOrmModule.forFeature(entitySchemas)],
  exports: [],
  controllers: [...controllers],
  providers: [...commands, ...queries, ...repositories],
})
export class AccountModule {}
