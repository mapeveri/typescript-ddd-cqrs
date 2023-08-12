import { Module } from '@nestjs/common';
import { LanguageModule } from './languages/infrastructure/nestjs/language.module';
import { SharedModule } from './shared/infrastructure/nestjs/shared.module';

@Module({
  imports: [SharedModule, LanguageModule],
})
export class AppModule {}
