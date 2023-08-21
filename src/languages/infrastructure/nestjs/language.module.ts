import { Module } from '@nestjs/common';
import { controllers } from './controllers';
import { commands, events, queries } from './cqrs';
import { services } from './services';
import { repositories } from './repositories';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers,
  providers: [...services, ...commands, ...queries, ...events, ...repositories],
})
export class LanguageModule {}
