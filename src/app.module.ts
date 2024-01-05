import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { LanguageModule } from './languages/language.module';
import { SharedModule } from './shared/shared.module';
import NestProjectionBus from './shared/infrastructure/bus/nestProjectionBus';
import { projections } from './languages/_dependencyInjection/projectionHandlers';

@Module({
  imports: [SharedModule, LanguageModule],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly projectionBus: NestProjectionBus) {}
  onApplicationBootstrap() {
    this.projectionBus.register(projections);
  }
}
