import { CommandHandler as NestCommandHandler, ICommandHandler as NestICommandHandler, ICommand } from '@nestjs/cqrs';

export function CommandHandler(command: ICommand | (new (...args: any[]) => ICommand)): ClassDecorator {
  return NestCommandHandler(command);
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICommandHandler<TCommand extends ICommand = any, TResult = any> extends NestICommandHandler {
  execute(command: TCommand): Promise<TResult>;
}
