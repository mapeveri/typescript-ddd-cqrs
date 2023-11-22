import LoginUserCommandHandler from '@src/languages/application/auth/command/loginUser/loginUserCommandHandler';
import CreateCountryCommandHandler from '@src/languages/application/country/command/create/createCountryCommandHandler';
import CreateExpressionCommandHandler from '@src/languages/application/expression/command/create/createExpressionCommandHandler';
import DeleteExpressionCommandHandler from '@src/languages/application/expression/command/delete/deleteExpressionCommandHandler';
import CreateTermCommandHandler from '@src/languages/application/term/command/create/createTermCommandHandler';
import CreateUserCommandHandler from '@src/languages/application/user/command/create/createUserCommandHandler';
import UpdateUserCommandHandler from '@src/languages/application/user/command/update/updateUserCommandHandler';
import CreateWordCommandHandler from '@src/languages/application/word/command/create/createWordCommandHandler';
import DeleteWordCommandHandler from '@src/languages/application/word/command/delete/deleteWordCommandHandler';

export const commands = [
  LoginUserCommandHandler,
  CreateCountryCommandHandler,
  CreateExpressionCommandHandler,
  CreateTermCommandHandler,
  CreateUserCommandHandler,
  UpdateUserCommandHandler,
  CreateWordCommandHandler,
  DeleteExpressionCommandHandler,
  DeleteWordCommandHandler,
];
