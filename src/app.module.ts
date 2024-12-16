import { Module } from '@nestjs/common';
import { LanguageModule } from './languages/language.module';
import { SharedModule } from './shared/shared.module';
import { AccountModule } from '@src/account/account.module';

@Module({
  imports: [SharedModule, AccountModule, LanguageModule],
})
export class AppModule {}
