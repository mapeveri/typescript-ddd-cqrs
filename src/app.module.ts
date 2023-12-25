import { Module } from '@nestjs/common';
import { LanguageModule } from './languages/language.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [SharedModule, LanguageModule],
})
export class AppModule {}
