import TermType from '@src/languages/domain/term/valueObjects/termType';
import TermId from '@src/languages/domain/term/valueObjects/termId';
import CountryId from '@src/languages/domain/country/valueObjects/countryId';
import UserId from '@src/languages/domain/user/valueObjects/userId';

export default class Term {
  constructor(
    readonly id: TermId,
    readonly languageId: string,
    readonly type: TermType,
    readonly countryId: CountryId,
    readonly userId: UserId,
  ) {}

  static create(id: TermId, languageId: string, type: TermType, countryId: CountryId, userId: UserId): Term {
    return new this(id, languageId, type, countryId, userId);
  }

  toPrimitives(): object {
    return {
      id: this.id.value,
      languageId: this.languageId,
      type: this.type.value,
      countryId: this.countryId.value,
      userId: this.userId.value,
    };
  }
}
