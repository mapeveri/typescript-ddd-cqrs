import CreateWordCommand from '@src/language/application/term/command/word/createWordCommand';
import Word from '@src/language/domain/term/word/word';
import UserId from '@src/account/domain/user/userId';
import { CountryIdMother } from '../../country/countryIdMother';
import WordTermCollectionMother from './wordTermCollectionMother';
import WordTerm from '@src/language/domain/term/word/wordTerm';
import WordTermMother, { WordTermMotherProps } from './wordTermMother';
import CountryId from '@src/language/domain/country/countryId';
import WordTermCollection from '@src/language/domain/term/word/wordTermCollection';
import { UserIdMother } from '@test/unit/account/domain/user/userIdMother';
import faker from 'faker';
import TermId from '@src/language/domain/term/termId';
import TermType, { TermTypeEnum } from '@src/language/domain/term/termType';
import { TermIdMother } from '@test/unit/language/domain/term/termIdMother';
import TermLikeMother from '@test/unit/language/domain/term/termLikeMother';
import TermLike from '@src/language/domain/term/termLike';

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
