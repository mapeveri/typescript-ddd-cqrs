import { Module } from '@nestjs/common';
import { LanguageModule } from './languages/language.module';
import { SharedModule } from './shared/shared.module';
import { AccountModule } from '@src/account/account.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';

export const MODULE_CONNECTIONS_NAME = 'MODULE_CONNECTIONS_NAME';

@Module({
  imports: [
    SharedModule.register([AccountModule, LanguageModule]),
    MikroOrmModule.forMiddleware(),
    AccountModule,
    LanguageModule,
  ],
})
export class AppModule {}
