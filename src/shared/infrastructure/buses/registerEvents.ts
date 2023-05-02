import { ContainerBuilder } from 'node-dependency-injection';
import MemoryEventBus from './memoryEventBus';
import UserAuthenticatedEvent from '../../../languages/domain/user/domainEvents/userAuthenticatedEvent';

export function registerEvents(container: ContainerBuilder) {
  const eventBus: MemoryEventBus = container.get('Shared.EventBus');

  eventBus.register(UserAuthenticatedEvent.prototype, [
    container.get('Users.CreateOrUpdateUserOnAuthenticationEventHandler'),
  ]);
}
