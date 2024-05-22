import CreateTermViewProjectionHandler from '@src/languages/application/term/projection/createTermViewProjectionHandler';
import AddLikeToTermViewProjectionHandler from '@src/languages/application/term/projection/addLikeToTermViewProjectionHandler';
import DislikeToTermViewProjectionHandler from '@src/languages/application/term/projection/dislikeToTermViewProjectionHandler';

export const projections = [
  CreateTermViewProjectionHandler,
  AddLikeToTermViewProjectionHandler,
  DislikeToTermViewProjectionHandler,
];
