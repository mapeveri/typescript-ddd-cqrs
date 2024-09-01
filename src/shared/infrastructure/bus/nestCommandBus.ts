import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Command } from '@src/shared/domain/bus/commandBus/command';
import { CommandBus as ICommandBus } from '@src/shared/domain/bus/commandBus/commandBus';
import MikroOrmTransactionalDecorator from '../persistence/mikroOrm/decorators/mikroOrmTransactionalDecorator';

@Injectable()
export default class NestCommandBus implements ICommandBus {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly transactionalDecorator: MikroOrmTransactionalDecorator,
  ) {}

  async dispatch(command: Command): Promise<void> {
    await this.transactionalDecorator.execute(async () => {
      await this.commandBus.execute(command);
    });
  }
}
