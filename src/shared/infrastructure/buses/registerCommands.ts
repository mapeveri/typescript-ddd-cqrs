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
import TransactionalHandlerDecoratorFactory from '../persistence/transactionalHandlerDecoratorFactory';

export function registerCommands(container: ContainerBuilder) {
  const commandBus: MemoryCommandBus = container.get(MemoryCommandBus);

  const commandHandlerMappings = [
    { command: CreateCountryCommand, handler: container.get(CreateCountryCommandHandler), database: 'postgres' },
    { command: LoginUserCommand, handler: container.get(LoginUserCommandHandler), database: 'postgres' },
    { command: CreateUserCommand, handler: container.get(CreateUserCommandHandler), database: 'postgres' },
    { command: UpdateUserCommand, handler: container.get(UpdateUserCommandHandler), database: 'postgres' },
    { command: CreateWordCommand, handler: container.get(CreateWordCommandHandler), database: 'postgres' },
    { command: CreateExpressionCommand, handler: container.get(CreateExpressionCommandHandler), database: 'postgres' },
    { command: CreateTermCommand, handler: container.get(CreateTermCommandHandler), database: 'mongo' },
  ];

  commandHandlerMappings.forEach(({ command, handler, database }) => {
    const decoratedHandler = new TransactionalHandlerDecoratorFactory(handler).get(database);
    commandBus.register(command.prototype, decoratedHandler);
  });
}
