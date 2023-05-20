import CreateWordCommand from '@src/languages/application/word/command/create/createWordCommand';
import Word from '@src/languages/domain/word/word';
import UserId from '@src/languages/domain/user/valueObjects/userId';
import { WordIdMother } from './valueObjects/wordIdMother';
import { CountryIdMother } from '../country/valueObjects/countryIdMother';
import TermCollectionMother from './valueObjects/wordTermCollectionMother';
import WordTerm from '@src/languages/domain/word/valueObjects/wordTerm';
import WordTermMother, { WordTermMotherProps } from './valueObjects/wordTermMother';

export default class WordMother {
  static createFromCreateWordCommand(command: CreateWordCommand, userId: UserId): Word {
    const terms = command.terms.map((term: { [key: string]: any }): WordTerm => {
      return WordTermMother.random({
        title: term['title'],
        description: term['description'],
        example: term['example'],
        taggedWords: term['tagged_words'],
      } as WordTermMotherProps);
    });

    return new Word(
      WordIdMother.random(command.id),
      command.languageId,
      CountryIdMother.random(command.countryId),
      TermCollectionMother.random(terms ?? [WordTermMother.random()]),
      userId
    );
  }
}
