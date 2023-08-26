import TermRepository, { TERM_REPOSITORY } from '@src/languages/domain/term/termRepository';
import CreateTermCommand from './createTermCommand';
import Term from '@src/languages/domain/term/term';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateTermCommand)
export default class CreateTermCommandHandler implements ICommandHandler<CreateTermCommand> {
  constructor(@Inject(TERM_REPOSITORY) private termRepository: TermRepository) {}

  async execute(command: CreateTermCommand): Promise<void> {
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
