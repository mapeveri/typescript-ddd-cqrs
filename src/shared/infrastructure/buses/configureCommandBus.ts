import CreateUserCommand from '@src/languages/application/user/command/create/createUserCommand';
import UpdateUserCommand from '@src/languages/application/user/command/update/updateUserCommand';
import CreateTermCommand from '@src/languages/application/term/command/create/createTermCommand';
import CreateUserCommandHandler from '@src/languages/application/user/command/create/createUserCommandHandler';
import UpdateUserCommandHandler from '@src/languages/application/user/command/update/updateUserCommandHandler';
import CreateTermCommandHandler from '@src/languages/application/term/command/create/createTermCommandHandler';
import TransactionalHandlerDecoratorFactory from '../persistence/transactionalHandlerDecoratorFactory';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { COMMAND_BUS } from '@src/shared/domain/buses/commandBus/commandBus';

export async function configureCommandBus() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const commandBus = app.get(COMMAND_BUS);

  const commandHandlerMappings = [
    { command: CreateUserCommand, handler: app.get(CreateUserCommandHandler), database: 'postgres' },
    { command: UpdateUserCommand, handler: app.get(UpdateUserCommandHandler), database: 'postgres' },
    { command: CreateTermCommand, handler: app.get(CreateTermCommandHandler), database: 'mongo' },
  ];

  commandHandlerMappings.forEach(({ command, handler, database }) => {
    const decoratedHandler = new TransactionalHandlerDecoratorFactory(handler).get(database);
    commandBus.register(command.prototype, decoratedHandler);
  });
}
