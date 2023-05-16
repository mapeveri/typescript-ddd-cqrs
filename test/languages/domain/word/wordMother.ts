import CreateWordCommand from '@src/languages/application/word/command/create/createWordCommand';
import Word, { WordTerm } from '@src/languages/domain/word/word';
import UserId from '@src/languages/domain/user/valueObjects/userId';
import { WordIdMother } from './valueObjects/wordIdMother';
import { CountryIdMother } from '../country/valueObjects/countryIdMother';

export default class WordMother {
  static createFromCreateWordCommand(command: CreateWordCommand, userId: UserId): Word {
    const terms = command.terms.map((term: { [key: string]: any }): WordTerm => {
      return {
        title: term['title'],
        description: term['description'],
        example: term['example'],
        taggedWords: term['tagged_words'],
      };
    });
    return new Word(
      WordIdMother.random(command.id),
      command.languageId,
      CountryIdMother.random(command.countryId),
      terms,
      userId
    );
  }
}
