import CreateWordCommand from '@src/languages/application/word/command/create/createWordCommand';
import Word from '@src/languages/domain/word/word';
import UserId from '@src/languages/domain/user/valueObjects/userId';
import { WordIdMother } from './valueObjects/wordIdMother';
import { CountryIdMother } from '../country/valueObjects/countryIdMother';
import WordTermCollectionMother from './valueObjects/wordTermCollectionMother';
import WordTerm from '@src/languages/domain/word/valueObjects/wordTerm';
import WordTermMother, { WordTermMotherProps } from './valueObjects/wordTermMother';
import WordId from '@src/languages/domain/word/valueObjects/wordId';
import CountryId from '@src/languages/domain/country/valueObjects/countryId';
import WordTermCollection from '@src/languages/domain/word/valueObjects/wordTermCollection';
import { UserIdMother } from '../user/valueObjects/userIdMother';
import faker from 'faker';

interface WordMotherProps {
  id?: WordId;
  languageId?: string;
  countryId?: CountryId;
  terms: WordTermCollection;
  userId: UserId;
}

export default class WordMother {
  static random(props?: WordMotherProps): Word {
    const { id, languageId, countryId, terms, userId } = props ?? {};

    return new Word(
      id ?? WordIdMother.random(),
      languageId ?? faker.datatype.uuid(),
      countryId ?? CountryIdMother.random(),
      terms ?? WordTermCollectionMother.random([]),
      userId ?? UserIdMother.random()
    );
  }

  static createFromCreateWordCommand(command: CreateWordCommand, userId: UserId): Word {
    const terms = command.terms.map((term: { [key: string]: any }): WordTerm => {
      return WordTermMother.random({
        title: term['word'],
        description: term['description'],
        example: term['example'],
        taggedWords: term['hashtags'],
      } as WordTermMotherProps);
    });

    return new Word(
      WordIdMother.random(command.id),
      command.languageId,
      CountryIdMother.random(command.countryId),
      WordTermCollectionMother.random(terms ?? [WordTermMother.random()]),
      userId
    );
  }
}
