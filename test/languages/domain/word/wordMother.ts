import CreateWordCommand from '@src/languages/application/word/command/create/createWordCommand';
import Word, { WordTerm } from '@src/languages/domain/word/word';
import User from '@src/languages/domain/user/user';

export default class WordMother {
  static createFromCreateWordCommand(command: CreateWordCommand, user: User): Word {
    const terms = command.terms.map((term: { [key: string]: any }): WordTerm => {
      return {
        title: term['title'],
        description: term['description'],
        example: term['example'],
        taggedWords: term['tagged_words'],
      };
    });
    return new Word(command.id, command.languageId, command.countryId, terms, user);
  }
}
