import { Injectable, Type } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Command } from '@src/shared/domain/bus/commandBus/command';
import { CommandBus as ICommandBus } from '@src/shared/domain/bus/commandBus/commandBus';
import MikroOrmTransactionalDecorator from '../persistence/mikroOrm/decorators/mikroOrmTransactionalDecorator';
import { DiscoveryService } from '@nestjs/core';
import { getCommandHandler } from '@src/shared/domain/bus/commandBus/commandHandler';

@Injectable()
export default class NestCommandBus implements ICommandBus {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly commandBus: CommandBus,
    private readonly transactionalDecorator: MikroOrmTransactionalDecorator,
  ) {}

  async dispatch(command: Command): Promise<void> {
    const module = await this.getModuleFromCommand(command);
    await this.transactionalDecorator.execute(module, async () => {
      await this.commandBus.execute(command);
    });
  }

  private async getModuleFromCommand(command: Command): Promise<string> {
    const handlerName = getCommandHandler(command) as unknown as Type<any>;
    try {
      const providers = this.discoveryService.getProviders();

      let foundModule: string | null = null;

      for (const provider of providers) {
        if (!provider.metatype || !provider.instance) continue;

        if (provider.metatype === handlerName) {
          foundModule = provider.host?.name ?? 'UnknownModule';
          break;
        }
      }

      if (!foundModule) {
        throw new Error('Command: module not found');
      }

      return foundModule;
    } catch (error) {
      console.error(`Error getting module for command: ${handlerName}`, error);
      throw error;
    }
  }
}
