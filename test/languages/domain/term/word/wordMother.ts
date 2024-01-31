import CreateWordCommand from '@src/languages/application/term/command/create/createWordCommand';
import Word from '@src/languages/domain/term/word/word';
import UserId from '@src/languages/domain/user/valueObjects/userId';
import { CountryIdMother } from '../../country/valueObjects/countryIdMother';
import WordTermCollectionMother from './wordTermCollectionMother';
import WordTerm from '@src/languages/domain/term/word/wordTerm';
import WordTermMother, { WordTermMotherProps } from './wordTermMother';
import CountryId from '@src/languages/domain/country/valueObjects/countryId';
import WordTermCollection from '@src/languages/domain/term/word/wordTermCollection';
import { UserIdMother } from '../../user/valueObjects/userIdMother';
import faker from 'faker';
import TermId from '@src/languages/domain/term/termId';
import { TermIdMother } from '@test/languages/domain/term/termIdMother';
import TermType, { TermTypeEnum } from '@src/languages/domain/term/termType';

interface WordMotherProps {
  id?: TermId;
  languageId?: string;
  countryId?: CountryId;
  terms: WordTermCollection;
  userId: UserId;
}

export default class WordMother {
  static random(props?: WordMotherProps): Word {
    const { id, languageId, countryId, terms, userId } = props ?? {};

    return new Word(
      id ?? TermIdMother.random(),
      languageId ?? faker.datatype.uuid(),
      TermType.of(TermTypeEnum.WORD),
      countryId ?? CountryIdMother.random(),
      terms ?? WordTermCollectionMother.random([]),
      userId ?? UserIdMother.random(),
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
      TermIdMother.random(command.id),
      command.languageId,
      TermType.of(TermTypeEnum.WORD),
      CountryIdMother.random(command.countryId),
      WordTermCollectionMother.random(
        terms?.map((term) => term.toPrimitives()) ?? [WordTermMother.random().toPrimitives()],
      ),
      userId,
    );
  }
}