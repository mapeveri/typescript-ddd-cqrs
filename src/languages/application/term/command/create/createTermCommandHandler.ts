import TermRepository from '@src/languages/domain/term/termRepository';
import { CommandHandler } from '@src/shared/domain/buses/commandBus/commandHandler';
import CreateTermCommand from './createTermCommand';
import Term from '@src/languages/domain/term/term';

export default class CreateTermCommandHandler implements CommandHandler {
  constructor(private termRepository: TermRepository) {}

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
