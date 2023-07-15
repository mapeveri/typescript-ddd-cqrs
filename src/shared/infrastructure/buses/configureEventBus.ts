import { ContainerBuilder } from 'node-dependency-injection';
import MemoryEventBus from './memoryEventBus';
import WordCreatedEvent from '@src/languages/domain/word/domainEvents/wordCreatedEvent';
import CreateOnWordCreatedEventHandler from '@src/languages/application/term/event/create/createOnWordCreatedEventHandler';
import ExpressionCreatedEvent from '@src/languages/domain/expression/domainEvents/expressionCreatedEvent';
import CreateOnExpressionCreatedEventHandler from '@src/languages/application/term/event/create/createOnExpressionCreatedEventHandler';
import CreateOrUpdateUserOnAuthSessionCreatedEventHandler from '@src/languages/application/user/event/createOrUpdate/createOrUpdateUserOnAuthSessionCreatedEventHandler';
import AuthSessionCreatedEvent from '@src/languages/domain/auth/domainEvents/authSessionCreatedEvent';

export function configureEventBus(container: ContainerBuilder) {
  const eventBus: MemoryEventBus = container.get(MemoryEventBus);

  eventBus.register(AuthSessionCreatedEvent.prototype, [container.get(CreateOrUpdateUserOnAuthSessionCreatedEventHandler)]);
  eventBus.register(WordCreatedEvent.prototype, [container.get(CreateOnWordCreatedEventHandler)]);
  eventBus.register(ExpressionCreatedEvent.prototype, [container.get(CreateOnExpressionCreatedEventHandler)]);
}
