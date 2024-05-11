import { IProjectionHandler, ProjectionHandler } from '@src/shared/domain/bus/projectionBus/projectionHandler';
import AddLikeToTermProjection from '@src/languages/application/term/projection/addLikeToTermProjection';

@ProjectionHandler(AddLikeToTermProjection)
export default class AddLikeToTermProjectionHandler implements IProjectionHandler<AddLikeToTermProjection> {
  constructor() {}

  async execute(_projection: AddLikeToTermProjection): Promise<void> {}
}
