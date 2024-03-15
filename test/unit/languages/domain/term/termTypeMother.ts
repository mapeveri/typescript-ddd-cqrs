import TermType, { TermTypeEnum } from '@src/languages/domain/term/termType';

export default class TermTypeMother {
  static random(value?: string): TermType {
    return TermType.of(value ?? TermTypeEnum.EXPRESSION);
  }
}
