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
    return {
      id: command.id,
      title: command.title,
      description: command.description,
      example: command.example,
      type: command.type,
      hashtags: command.hashtags,
      likes: [],
      disLikes: [],
      favourites: [],
    } as Term;
  }
}
