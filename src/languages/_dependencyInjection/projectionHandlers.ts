import CreateExpressionTermViewProjectionHandler from '@src/languages/infrastructure/projection/createExpressionTermViewProjectionHandler';
import AddLikeToTermViewProjectionHandler from '@src/languages/infrastructure/projection/addLikeToTermViewProjectionHandler';
import DislikeToTermViewProjectionHandler from '@src/languages/infrastructure/projection/dislikeToTermViewProjectionHandler';
import CreateWordTermViewProjectionHandler from '@src/languages/infrastructure/projection/createWordTermViewProjectionHandler';

export const projections = [
  CreateExpressionTermViewProjectionHandler,
  CreateWordTermViewProjectionHandler,
  AddLikeToTermViewProjectionHandler,
  DislikeToTermViewProjectionHandler,
];
