import CreateWordCommand from '@src/languages/application/term/command/word/createWordCommand';
import Word from '@src/languages/domain/term/word/word';
import UserId from '@src/account/domain/user/userId';
import { CountryIdMother } from '../../country/countryIdMother';
import WordTermCollectionMother from './wordTermCollectionMother';
import WordTerm from '@src/languages/domain/term/word/wordTerm';
import WordTermMother, { WordTermMotherProps } from './wordTermMother';
import CountryId from '@src/languages/domain/country/countryId';
import WordTermCollection from '@src/languages/domain/term/word/wordTermCollection';
import { UserIdMother } from '@test/unit/account/domain/user/userIdMother';
import faker from 'faker';
import TermId from '@src/languages/domain/term/termId';
import TermType, { TermTypeEnum } from '@src/languages/domain/term/termType';
import { TermIdMother } from '@test/unit/languages/domain/term/termIdMother';
import TermLikeMother from '@test/unit/languages/domain/term/termLikeMother';
import TermLike from '@src/languages/domain/term/termLike';

interface WordMotherProps {
  id?: TermId;
  languageId?: string;
  countryId?: CountryId;
  terms?: WordTermCollection;
  userId?: UserId;
  likes?: TermLike[];
}

export default class WordMother {
  static random(props?: WordMotherProps): Word {
    const { id, languageId, countryId, terms, userId, likes } = props ?? {};

    return new Word(
      id ?? TermIdMother.random(),
      languageId ?? faker.address.countryCode(),
      TermType.of(TermTypeEnum.WORD),
      countryId ?? CountryIdMother.random(),
      userId ?? UserIdMother.random(),
      likes ?? [TermLikeMother.random()],
      terms ?? WordTermCollectionMother.random([]),
    );
  }

  static createFromCreateWordCommand(command: CreateWordCommand): Word {
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
      UserIdMother.random(command.userId),
      [],
      WordTermCollectionMother.random(
        terms?.map((term) => term.toPrimitives()) ?? [WordTermMother.random().toPrimitives()],
      ),
    );
  }
}
