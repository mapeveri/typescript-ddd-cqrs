import DeleteExpressionOnTermCreatedFailedEventHandler from '@src/languages/application/expression/event/delete/deleteExpressionOnTermCreatedFailedEventHandler';
import CreateOnExpressionCreatedEventHandler from '@src/languages/application/term/event/create/createOnExpressionCreatedEventHandler';
import CreateOnWordCreatedEventHandler from '@src/languages/application/term/event/create/createOnWordCreatedEventHandler';
import CreateOrUpdateUserOnAuthSessionCreatedEventHandler from '@src/languages/application/user/event/createOrUpdate/createOrUpdateUserOnAuthSessionCreatedEventHandler';
import DeleteWordOnTermCreatedFailedEventHandler from '@src/languages/application/word/event/delete/deleteWordOnTermCreatedFailedEventHandler';

export const events = [
  CreateOnWordCreatedEventHandler,
  CreateOrUpdateUserOnAuthSessionCreatedEventHandler,
  CreateOnExpressionCreatedEventHandler,
  DeleteExpressionOnTermCreatedFailedEventHandler,
  DeleteWordOnTermCreatedFailedEventHandler,
];
