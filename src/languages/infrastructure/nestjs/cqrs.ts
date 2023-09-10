import LoginUserCommandHandler from '@src/languages/application/auth/command/loginUser/loginUserCommandHandler';
import CreateCountryCommandHandler from '@src/languages/application/country/command/create/createCountryCommandHandler';
import FindCountryQueryHandler from '@src/languages/application/country/query/find/findCountryQueryHandler';
import FindCountriesQueryHandler from '@src/languages/application/country/query/findAll/findCountriesQueryHandler';
import CreateExpressionCommandHandler from '@src/languages/application/expression/command/create/createExpressionCommandHandler';
import DeleteExpressionCommandHandler from '@src/languages/application/expression/command/delete/deleteExpressionCommandHandler';
import DeleteExpressionOnTermCreatedFailedEventHandler from '@src/languages/application/expression/event/delete/deleteExpressionOnTermCreatedFailedEventHandler';
import CreateTermCommandHandler from '@src/languages/application/term/command/create/createTermCommandHandler';
import CreateOnExpressionCreatedEventHandler from '@src/languages/application/term/event/create/createOnExpressionCreatedEventHandler';
import CreateOnWordCreatedEventHandler from '@src/languages/application/term/event/create/createOnWordCreatedEventHandler';
import SearchTermQueryHandler from '@src/languages/application/term/query/search/searchTermQueryHandler';
import CreateUserCommandHandler from '@src/languages/application/user/command/create/createUserCommandHandler';
import UpdateUserCommandHandler from '@src/languages/application/user/command/update/updateUserCommandHandler';
import CreateOrUpdateUserOnAuthSessionCreatedEventHandler from '@src/languages/application/user/event/createOrUpdate/createOrUpdateUserOnAuthSessionCreatedEventHandler';
import FindUserQueryHandler from '@src/languages/application/user/query/find/findUserQueryHandler';
import CreateWordCommandHandler from '@src/languages/application/word/command/create/createWordCommandHandler';
import DeleteWordCommandHandler from '@src/languages/application/word/command/delete/deleteWordCommandHandler';
import DeleteWordOnTermCreatedFailedEventHandler from '@src/languages/application/word/event/delete/deleteWordOnTermCreatedFailedEventHandler';

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

export const queries = [
  FindCountryQueryHandler,
  FindCountriesQueryHandler,
  SearchTermQueryHandler,
  FindUserQueryHandler,
];

export const events = [
  CreateOnWordCreatedEventHandler,
  CreateOrUpdateUserOnAuthSessionCreatedEventHandler,
  CreateOnExpressionCreatedEventHandler,
  DeleteExpressionOnTermCreatedFailedEventHandler,
  DeleteWordOnTermCreatedFailedEventHandler,
];
