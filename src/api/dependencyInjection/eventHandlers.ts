import DeleteExpressionOnTermCreatedFailedEventHandler from '@src/languages/application/expression/event/delete/deleteExpressionOnTermCreatedFailedEventHandler';
import CreateOnExpressionCreatedEventHandler from '@src/languages/application/term/event/create/createOnExpressionCreatedEventHandler';
import CreateOnWordCreatedEventHandler from '@src/languages/application/term/event/create/createOnWordCreatedEventHandler';
import CreateUserOnAuthSessionCreatedEventHandler from '@src/languages/application/user/event/create/createUserOnAuthSessionCreatedEventHandler';
import DeleteWordOnTermCreatedFailedEventHandler from '@src/languages/application/word/event/delete/deleteWordOnTermCreatedFailedEventHandler';

export const events = [
  CreateOnWordCreatedEventHandler,
  CreateUserOnAuthSessionCreatedEventHandler,
  CreateOnExpressionCreatedEventHandler,
  DeleteExpressionOnTermCreatedFailedEventHandler,
  DeleteWordOnTermCreatedFailedEventHandler,
];
