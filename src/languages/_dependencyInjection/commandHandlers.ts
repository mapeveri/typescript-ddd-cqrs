import LoginUserCommandHandler from '@src/languages/application/auth/command/loginUserCommandHandler';
import CreateCountryCommandHandler from '@src/languages/application/country/command/createCountryCommandHandler';
import CreateExpressionCommandHandler from '@src/languages/application/term/command/expression/createExpressionCommandHandler';
import DeleteTermCommandHandler from '@src/languages/application/term/command/deleteTermCommandHandler';
import CreateUserCommandHandler from '@src/languages/application/user/command/createUserCommandHandler';
import UpdateUserCommandHandler from '@src/languages/application/user/command/updateUserCommandHandler';
import CreateWordCommandHandler from '@src/languages/application/term/command/word/createWordCommandHandler';
import AddLikeTermCommandHandler from '@src/languages/application/term/command/addLikeTermCommandHandler';
import DislikeTermCommandHandler from '@src/languages/application/term/command/dislikeTermCommandHandler';
import UpdateWordCommandHandler from '@src/languages/application/term/command/word/updateWordCommandHandler';

export const commands = [
  LoginUserCommandHandler,
  CreateCountryCommandHandler,
  CreateExpressionCommandHandler,
  CreateUserCommandHandler,
  UpdateUserCommandHandler,
  CreateWordCommandHandler,
  UpdateWordCommandHandler,
  DeleteTermCommandHandler,
  AddLikeTermCommandHandler,
  DislikeTermCommandHandler,
];
