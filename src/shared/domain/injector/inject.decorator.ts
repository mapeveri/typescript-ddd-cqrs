import { Inject as NestInject } from '@nestjs/common';

export function Inject<T = any>(token?: T): PropertyDecorator & ParameterDecorator {
  return NestInject(token);
}
