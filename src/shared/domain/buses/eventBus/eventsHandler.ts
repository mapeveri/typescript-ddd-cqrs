import { EventsHandler as NestEventHandler, IEventHandler as NestIEventHandler, IEvent } from '@nestjs/cqrs';

export function EventsHandler(...events: (IEvent | (new (...args: any[]) => IEvent))[]): ClassDecorator {
  return NestEventHandler(...events);
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IEventHandler<TEvent extends IEvent = any> extends NestIEventHandler {
  handle(event: TEvent): any;
}
