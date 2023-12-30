import { Module } from '@nestjs/common';
import { LanguageModule } from './languages/language.module';
import { SharedModule } from './shared/shared.module';
import { cliCommands } from './cli';

@Module({
  imports: [SharedModule, LanguageModule],
  providers: [...cliCommands],
})
export class AppModule {}
