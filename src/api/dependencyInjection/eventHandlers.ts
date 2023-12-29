import DeleteExpressionOnTermCreatedFailedEventHandler from '@src/languages/application/expression/event/delete/deleteExpressionOnTermCreatedFailedEventHandler';
import CreateTermsOnExpressionCreatedEventHandler from '@src/languages/application/term/event/create/createTermsOnExpressionCreatedEventHandler';
import CreateTermsOnWordCreatedEventHandler from '@src/languages/application/term/event/create/createTermsOnWordCreatedEventHandler';
import CreateUserOnAuthSessionCreatedEventHandler from '@src/languages/application/user/event/create/createUserOnAuthSessionCreatedEventHandler';
import DeleteWordOnTermCreatedFailedEventHandler from '@src/languages/application/word/event/delete/deleteWordOnTermCreatedFailedEventHandler';

export const events = [
  CreateTermsOnExpressionCreatedEventHandler,
  CreateTermsOnWordCreatedEventHandler,
  CreateUserOnAuthSessionCreatedEventHandler,
  DeleteExpressionOnTermCreatedFailedEventHandler,
  DeleteWordOnTermCreatedFailedEventHandler,
];
