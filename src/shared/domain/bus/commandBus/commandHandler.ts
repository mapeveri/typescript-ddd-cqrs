import { Type } from '@nestjs/common';
import { CommandHandler as NestCommandHandler, ICommandHandler as NestICommandHandler, ICommand } from '@nestjs/cqrs';

const COMMAND_HANDLER_REGISTRY = new Map<ICommand | (new (...args: any[]) => ICommand), Type<any>>();

export function CommandHandler(command: ICommand | (new (...args: any[]) => ICommand)): ClassDecorator {
  return function (target: any) {
    COMMAND_HANDLER_REGISTRY.set(command, target);

    return NestCommandHandler(command)(target);
  };
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICommandHandler<TCommand extends ICommand = any, TResult = any> extends NestICommandHandler {
  execute(command: TCommand): Promise<TResult>;
}

export function getCommandHandler(command: any): Type<any> | undefined {
  return COMMAND_HANDLER_REGISTRY.get(command.constructor);
}
