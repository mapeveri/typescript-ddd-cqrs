import { Module } from '@nestjs/common';

import { controllers } from '@src/account/_dependencyInjection/controllers';
import { commands } from '@src/account/_dependencyInjection/commandHandlers';
import { queries } from '@src/account/_dependencyInjection/queryHandlers';
import { repositories } from '@src/account/_dependencyInjection/repositories';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { entitySchemas as accountEntitySchemas } from '@src/account/_dependencyInjection/entitySchemas';

@Module({
  imports: [MikroOrmModule.forFeature([...accountEntitySchemas])],
  exports: [],
  controllers: [...controllers],
  providers: [...commands, ...queries, ...repositories],
})
export class AccountModule {}
