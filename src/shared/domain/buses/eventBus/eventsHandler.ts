import { EventsHandler as NestEventHandler, IEventHandler as NestIEventHandler, IEvent } from '@nestjs/cqrs';
import { backOff } from 'exponential-backoff';

export function EventsHandler(...events: (IEvent | (new (...args: any[]) => IEvent))[]): ClassDecorator {
  const handlerDecorator = NestEventHandler(...events);

  return (target: any) => {
    const originalHandle = target.prototype.handle;

    target.prototype.handle = async function (...args: any[]) {
      return backOff(
        async () => {
          return originalHandle.apply(this, args);
        },
        { numOfAttempts: 3, delayFirstAttempt: false, startingDelay: 5000 },
      );
    };

    handlerDecorator(target);
  };
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IEventHandler<TEvent extends IEvent = any> extends NestIEventHandler {
  handle(event: TEvent): any;
}
