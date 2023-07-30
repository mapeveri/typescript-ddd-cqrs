import { Module } from '@nestjs/common';
import { LanguageModule } from './languages/infrastructure/nestjs/language.module';

@Module({
  imports: [LanguageModule],
})
export class AppModule {}
