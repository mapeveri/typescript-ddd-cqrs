import { ContainerBuilder } from 'node-dependency-injection';

import MemoryCommandBus from './memoryCommandBus';
import CreateCountryCommand from '../../../languages/application/country/command/create/createCountryCommand';
import LoginUserCommand from '../../../languages/application/auth/command/loginUser/loginUserCommand';
import CreateUserCommand from '../../../languages/application/user/command/create/createUserCommand';
import UpdateUserCommand from '../../../languages/application/user/command/update/updateUserCommand';

export function registerCommands(container: ContainerBuilder) {
  const commandBus: MemoryCommandBus = container.get('Shared.CommandBus');

  commandBus.register(CreateCountryCommand.prototype, container.get('Countries.CreateCountryCommandHandler'));

  commandBus.register(LoginUserCommand.prototype, container.get('Auth.LoginUserCommandHandler'));

  commandBus.register(CreateUserCommand.prototype, container.get('Users.CreateUserCommandHandler'));

  commandBus.register(UpdateUserCommand.prototype, container.get('Users.UpdateUserCommandHandler'));
}
