import TermType from '@src/languages/domain/term/termType';
import TermId from '@src/languages/domain/term/termId';
import CountryId from '@src/languages/domain/country/valueObjects/countryId';
import UserId from '@src/languages/domain/user/valueObjects/userId';
import { AggregateRoot } from '@src/shared/domain/aggregate/aggregateRoot';

export default abstract class Term extends AggregateRoot {
  id: TermId;
  languageId: string;
  type: TermType;
  countryId: CountryId;
  userId: UserId;

  protected constructor(id: TermId, languageId: string, type: TermType, countryId: CountryId, userId: UserId) {
    super();

    this.id = id;
    this.languageId = languageId;
    this.type = type;
    this.countryId = countryId;
    this.userId = userId;
  }
}
