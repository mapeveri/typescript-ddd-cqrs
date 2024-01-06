import 'reflect-metadata';

import { PROJECTION_HANDLER_METADATA, PROJECTION_METADATA } from './constants';
import { Projection } from './projection';
import { Uuid } from '@src/shared/domain/valueObjects/uuid';

export const ProjectionHandler = (projection: Projection | (new (...args: never[]) => Projection)): ClassDecorator => {
  return (target: object) => {
    if (!Reflect.hasOwnMetadata(PROJECTION_METADATA, projection)) {
      Reflect.defineMetadata(PROJECTION_METADATA, { id: Uuid.random().value }, projection);
    }
    Reflect.defineMetadata(PROJECTION_HANDLER_METADATA, projection, target);
  };
};

export interface IProjectionHandler<TProjection extends Projection> {
  execute(projection: TProjection): Promise<void>;
}
