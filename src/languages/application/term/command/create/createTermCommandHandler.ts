import TermRepository, { TERM_REPOSITORY } from '@src/languages/domain/term/termRepository';
import { CommandHandler } from '@src/shared/domain/buses/commandBus/commandHandler';
import CreateTermCommand from './createTermCommand';
import Term from '@src/languages/domain/term/term';
import { Inject } from '@src/shared/domain/injector/inject.decorator';

export default class CreateTermCommandHandler implements CommandHandler {
  constructor(@Inject(TERM_REPOSITORY) private termRepository: TermRepository) {}

  async handle(command: CreateTermCommand): Promise<void> {
    const term = this.getTerm(command);
    await this.termRepository.save(term);
  }

  private getTerm(command: CreateTermCommand): Term {
    return Term.create(
      command.id,
      command.title,
      command.description,
      command.example,
      command.type,
      command.hashtags,
      [],
      [],
      []
    );
  }
}
