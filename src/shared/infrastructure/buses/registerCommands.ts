import { ContainerBuilder } from 'node-dependency-injection';

import MemoryCommandBus from './memoryCommandBus';
import CreateCountryCommand from '../../../languages/application/country/command/create/createCountryCommand';
import LoginUserCommand from '../../../languages/application/auth/command/loginUser/loginUserCommand';
import CreateUserCommand from '../../../languages/application/user/command/create/createUserCommand';
import UpdateUserCommand from '../../../languages/application/user/command/update/updateUserCommand';
import CreateWordCommand from '../../../languages/application/word/command/create/createWordCommand';
import CreateTermCommand from '../../../languages/application/term/command/create/createTermCommand';
import CreateCountryCommandHandler from '../../../languages/application/country/command/create/createCountryCommandHandler';
import LoginUserCommandHandler from '../../../languages/application/auth/command/loginUser/loginUserCommandHandler';
import CreateUserCommandHandler from '../../../languages/application/user/command/create/createUserCommandHandler';
import UpdateUserCommandHandler from '../../../languages/application/user/command/update/updateUserCommandHandler';
import CreateWordCommandHandler from '../../../languages/application/word/command/create/createWordCommandHandler';
import CreateTermCommandHandler from '../../../languages/application/term/command/create/createTermCommandHandler';

export function registerCommands(container: ContainerBuilder) {
  const commandBus: MemoryCommandBus = container.get(MemoryCommandBus);

  commandBus.register(CreateCountryCommand.prototype, container.get(CreateCountryCommandHandler));
  commandBus.register(LoginUserCommand.prototype, container.get(LoginUserCommandHandler));
  commandBus.register(CreateUserCommand.prototype, container.get(CreateUserCommandHandler));
  commandBus.register(UpdateUserCommand.prototype, container.get(UpdateUserCommandHandler));
  commandBus.register(CreateWordCommand.prototype, container.get(CreateWordCommandHandler));
  commandBus.register(CreateTermCommand.prototype, container.get(CreateTermCommandHandler));
}
