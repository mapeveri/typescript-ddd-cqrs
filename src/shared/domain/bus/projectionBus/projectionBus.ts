import { Projection } from './projection';

export interface ProjectionBus {
  dispatch(projection: Projection): Promise<void>;
}

export const PROJECTION_BUS = Symbol('ProjectionBus');
