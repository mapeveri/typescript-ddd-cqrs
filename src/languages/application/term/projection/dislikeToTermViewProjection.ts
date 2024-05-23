import { Projection } from '@src/shared/domain/bus/projectionBus/projection';

export default class DislikeToTermViewProjection implements Projection {
  constructor(public readonly id: string, public readonly userId: string) {}
}
