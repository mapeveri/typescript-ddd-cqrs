import WordCreatedEvent from '@src/languages/domain/word/domainEvents/wordCreatedEvent';
import CreateOnWordCreatedEventHandler from '@src/languages/application/term/event/create/createOnWordCreatedEventHandler';
import ExpressionCreatedEvent from '@src/languages/domain/expression/domainEvents/expressionCreatedEvent';
import CreateOnExpressionCreatedEventHandler from '@src/languages/application/term/event/create/createOnExpressionCreatedEventHandler';
import CreateOrUpdateUserOnAuthSessionCreatedEventHandler from '@src/languages/application/user/event/createOrUpdate/createOrUpdateUserOnAuthSessionCreatedEventHandler';
import AuthSessionCreatedEvent from '@src/languages/domain/auth/domainEvents/authSessionCreatedEvent';
import { EVENT_BUS } from '@src/shared/domain/buses/eventBus/eventBus';
import { AppModule } from '@src/app.module';
import { NestFactory } from '@nestjs/core';

export async function configureEventBus() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const eventBus = app.get(EVENT_BUS);

  eventBus.register(AuthSessionCreatedEvent.prototype, [app.get(CreateOrUpdateUserOnAuthSessionCreatedEventHandler)]);
  eventBus.register(WordCreatedEvent.prototype, [app.get(CreateOnWordCreatedEventHandler)]);
  eventBus.register(ExpressionCreatedEvent.prototype, [app.get(CreateOnExpressionCreatedEventHandler)]);
}
