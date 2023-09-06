import TermRepository, { TERM_REPOSITORY } from '@src/languages/domain/term/termRepository';
import CreateTermCommand from './createTermCommand';
import Term from '@src/languages/domain/term/term';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { CommandHandler, ICommandHandler } from '@src/shared/domain/buses/commandBus/commandHandler';
import ExpressionRepository, { EXPRESSION_REPOSITORY } from '@src/languages/domain/expression/expressionRepository';
import WordRepository, { WORD_REPOSITORY } from '@src/languages/domain/word/wordRepository';
import TermType from '@src/languages/domain/term/valueObjects/termType';

@CommandHandler(CreateTermCommand)
export default class CreateTermCommandHandler implements ICommandHandler<CreateTermCommand> {
  constructor(
    @Inject(TERM_REPOSITORY) private termRepository: TermRepository,
    @Inject(EXPRESSION_REPOSITORY) private expressionRepository: ExpressionRepository,
    @Inject(WORD_REPOSITORY) private wordRepository: WordRepository
  ) {}

  async execute(command: CreateTermCommand): Promise<void> {
    const term = this.getTerm(command);
    try {
      await this.termRepository.save(term);
    } catch (e) {
      if (term.type.isExpression()) {
        await this.expressionRepository.delete(term);
      } else if (term.type.isWord()) {
        await this.wordRepository.delete(term);
      }

      throw e;
    }
  }

  private getTerm(command: CreateTermCommand): Term {
    return Term.create(
      command.id,
      command.title,
      command.description,
      command.example,
      TermType.of(command.type),
      command.hashtags,
      [],
      [],
      []
    );
  }
}
