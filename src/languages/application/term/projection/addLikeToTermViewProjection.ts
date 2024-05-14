import { Projection } from '@src/shared/domain/bus/projectionBus/projection';

export default class AddLikeToTermViewProjection implements Projection {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly name: string,
    public readonly photo: string,
  ) {}
}
