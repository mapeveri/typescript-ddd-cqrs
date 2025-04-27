import CreateExpressionTermViewProjectionHandler from '@src/language/infrastructure/projection/createExpressionTermViewProjectionHandler';
import AddLikeToTermViewProjectionHandler from '@src/language/infrastructure/projection/addLikeToTermViewProjectionHandler';
import DislikeToTermViewProjectionHandler from '@src/language/infrastructure/projection/dislikeToTermViewProjectionHandler';
import CreateWordTermViewProjectionHandler from '@src/language/infrastructure/projection/createWordTermViewProjectionHandler';

export const projections = [
  CreateExpressionTermViewProjectionHandler,
  CreateWordTermViewProjectionHandler,
  AddLikeToTermViewProjectionHandler,
  DislikeToTermViewProjectionHandler,
];
