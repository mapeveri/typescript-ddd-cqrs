import { Module } from '@nestjs/common';
import { LanguageModule } from './languages/language.module';
import { SharedModule } from './shared/shared.module';
import { AccountModule } from '@src/account/account.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfiguration from '@src/mikroOrmConfig';

@Module({
  imports: [SharedModule, MikroOrmModule.forRoot(mikroOrmConfiguration), AccountModule, LanguageModule],
})
export class AppModule {}
