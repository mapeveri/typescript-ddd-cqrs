import LoginUserCommandHandler from '@src/languages/application/auth/command/loginUserCommandHandler';
import CreateCountryCommandHandler from '@src/languages/application/country/command/create/createCountryCommandHandler';
import CreateExpressionCommandHandler from '@src/languages/application/term/command/expression/createExpressionCommandHandler';
import DeleteExpressionCommandHandler from '@src/languages/application/term/command/expression/deleteExpressionCommandHandler';
import CreateUserCommandHandler from '@src/languages/application/user/command/create/createUserCommandHandler';
import UpdateUserCommandHandler from '@src/languages/application/user/command/update/updateUserCommandHandler';
import CreateWordCommandHandler from '@src/languages/application/term/command/word/createWordCommandHandler';
import DeleteWordCommandHandler from '@src/languages/application/term/command/word/deleteWordCommandHandler';
import AddLikeTermCommandHandler from '@src/languages/application/term/command/addLikeTermCommandHandler';

export const commands = [
  LoginUserCommandHandler,
  CreateCountryCommandHandler,
  CreateExpressionCommandHandler,
  CreateUserCommandHandler,
  UpdateUserCommandHandler,
  CreateWordCommandHandler,
  DeleteExpressionCommandHandler,
  DeleteWordCommandHandler,
  AddLikeTermCommandHandler,
];
