import { Module } from '@nestjs/common';

import { controllers } from '@src/account/_dependencyInjection/controllers';
import { commands } from '@src/account/_dependencyInjection/commandHandlers';
import { queries } from '@src/account/_dependencyInjection/queryHandlers';
import { repositories } from '@src/account/_dependencyInjection/repositories';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { entitySchemas as accountEntitySchemas } from '@src/account/_dependencyInjection/entitySchemas';
import { services } from '@src/account/_dependencyInjection/services';
import { mikroOrmConfiguration } from '@src/account/mikroOrmConfig';

@Module({
  imports: [MikroOrmModule.forRoot(mikroOrmConfiguration), MikroOrmModule.forFeature(accountEntitySchemas, 'account')],
  exports: [],
  controllers: [...controllers],
  providers: [...commands, ...queries, ...repositories, ...services],
})
export class AccountModule {}
