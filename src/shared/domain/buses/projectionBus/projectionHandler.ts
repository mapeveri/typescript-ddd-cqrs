import { CommandHandler as NestCommandHandler, ICommandHandler as NestICommandHandler, ICommand } from '@nestjs/cqrs';

export function ProjectionHandler(projection: ICommand | (new (...args: any[]) => ICommand)): ClassDecorator {
  return NestCommandHandler(projection);
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IProjectionHandler<TCommand extends ICommand = any, TResult = any> extends NestICommandHandler {
  execute(projection: TCommand): Promise<TResult>;
}
