import { Module } from '@nestjs/common';
import { controllers, legacyControllers } from './controllers';
import { commands, events, queries } from './cqrs';
import { services } from './services';
import { repositories } from './repositories';
import { SharedModule } from '@src/shared/infrastructure/nestjs/shared.module';

@Module({
  imports: [SharedModule],
  controllers,
  providers: [...services, ...commands, ...queries, ...events, ...repositories, ...legacyControllers],
})
export class LanguageModule {}