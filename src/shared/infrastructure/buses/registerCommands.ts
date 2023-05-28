import { ContainerBuilder } from 'node-dependency-injection';

import MemoryCommandBus from './memoryCommandBus';
import CreateCountryCommand from '@src/languages/application/country/command/create/createCountryCommand';
import LoginUserCommand from '@src/languages/application/auth/command/loginUser/loginUserCommand';
import CreateUserCommand from '@src/languages/application/user/command/create/createUserCommand';
import UpdateUserCommand from '@src/languages/application/user/command/update/updateUserCommand';
import CreateWordCommand from '@src/languages/application/word/command/create/createWordCommand';
import CreateTermCommand from '@src/languages/application/term/command/create/createTermCommand';
import CreateCountryCommandHandler from '@src/languages/application/country/command/create/createCountryCommandHandler';
import LoginUserCommandHandler from '@src/languages/application/auth/command/loginUser/loginUserCommandHandler';
import CreateUserCommandHandler from '@src/languages/application/user/command/create/createUserCommandHandler';
import UpdateUserCommandHandler from '@src/languages/application/user/command/update/updateUserCommandHandler';
import CreateWordCommandHandler from '@src/languages/application/word/command/create/createWordCommandHandler';
import CreateTermCommandHandler from '@src/languages/application/term/command/create/createTermCommandHandler';
import CreateExpressionCommandHandler from '@src/languages/application/expression/command/create/createExpressionCommandHandler';
import CreateExpressionCommand from '@src/languages/application/expression/command/create/createExpressionCommand';

export function registerCommands(container: ContainerBuilder) {
  const commandBus: MemoryCommandBus = container.get(MemoryCommandBus);

  commandBus.register(CreateCountryCommand.prototype, container.get(CreateCountryCommandHandler));
  commandBus.register(LoginUserCommand.prototype, container.get(LoginUserCommandHandler));
  commandBus.register(CreateUserCommand.prototype, container.get(CreateUserCommandHandler));
  commandBus.register(UpdateUserCommand.prototype, container.get(UpdateUserCommandHandler));
  commandBus.register(CreateWordCommand.prototype, container.get(CreateWordCommandHandler));
  commandBus.register(CreateExpressionCommand.prototype, container.get(CreateExpressionCommandHandler));
  commandBus.register(CreateTermCommand.prototype, container.get(CreateTermCommandHandler));
}
