import { ContainerBuilder } from 'node-dependency-injection';
import MemoryEventBus from './memoryEventBus';
import UserAuthenticatedEvent from '@src/languages/domain/user/domainEvents/userAuthenticatedEvent';
import WordCreatedEvent from '@src/languages/domain/word/domainEvents/wordCreatedEvent';
import CreateOrUpdateUserOnAuthenticationEventHandler from '@src/languages/application/user/event/createOrUpdate/createOrUpdateUserOnAuthenticationEventHandler';
import CreateOnWordCreatedEventHandler from '@src/languages/application/term/event/create/createOnWordCreatedEventHandler';
import ExpressionCreatedEvent from '@src/languages/domain/expression/domainEvents/expressionCreatedEvent';
import CreateOnExpressionCreatedEventHandler from '@src/languages/application/term/event/create/createOnExpressionCreatedEventHandler';

export function configureEventBus(container: ContainerBuilder) {
  const eventBus: MemoryEventBus = container.get(MemoryEventBus);

  eventBus.register(UserAuthenticatedEvent.prototype, [container.get(CreateOrUpdateUserOnAuthenticationEventHandler)]);
  eventBus.register(WordCreatedEvent.prototype, [container.get(CreateOnWordCreatedEventHandler)]);
  eventBus.register(ExpressionCreatedEvent.prototype, [container.get(CreateOnExpressionCreatedEventHandler)]);
}
