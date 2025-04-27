import CreateCountryCommandHandler from '@src/language/application/country/command/createCountryCommandHandler';
import CreateExpressionCommandHandler from '@src/language/application/term/command/expression/createExpressionCommandHandler';
import DeleteTermCommandHandler from '@src/language/application/term/command/deleteTermCommandHandler';
import CreateWordCommandHandler from '@src/language/application/term/command/word/createWordCommandHandler';
import AddLikeTermCommandHandler from '@src/language/application/term/command/addLikeTermCommandHandler';
import DislikeTermCommandHandler from '@src/language/application/term/command/dislikeTermCommandHandler';
import UpdateWordCommandHandler from '@src/language/application/term/command/word/updateWordCommandHandler';

export const commands = [
  CreateCountryCommandHandler,
  CreateExpressionCommandHandler,
  CreateWordCommandHandler,
  UpdateWordCommandHandler,
  DeleteTermCommandHandler,
  AddLikeTermCommandHandler,
  DislikeTermCommandHandler,
];
