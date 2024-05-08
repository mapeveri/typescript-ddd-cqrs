import { Projection } from '@src/shared/domain/bus/projectionBus/projection';

export default class CreateTermProjection implements Projection {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly example: string,
    public readonly hashtags: Array<string>,
    public readonly type: string,
    public readonly createdAt: Date,
  ) {}
}
