import { ContainerBuilder } from 'node-dependency-injection';
import MemoryEventBus from './memoryEventBus';
import UserAuthenticatedEvent from '../../../languages/domain/user/domainEvents/userAuthenticatedEvent';
import WordCreatedEvent from '../../../languages/domain/word/domainEvents/wordCreatedEvent';
import CreateOrUpdateUserOnAuthenticationEventHandler from '../../../languages/application/user/event/createOrUpdate/createOrUpdateUserOnAuthenticationEventHandler';
import CreateOnWordCreatedEventHandler from '../../../languages/application/term/event/create/createOnWordCreatedEventHandler';

export function registerEvents(container: ContainerBuilder) {
  const eventBus: MemoryEventBus = container.get(MemoryEventBus);

  eventBus.register(UserAuthenticatedEvent.prototype, [container.get(CreateOrUpdateUserOnAuthenticationEventHandler)]);
  eventBus.register(WordCreatedEvent.prototype, [container.get(CreateOnWordCreatedEventHandler)]);
}
