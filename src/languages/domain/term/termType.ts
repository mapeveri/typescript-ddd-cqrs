import { ValueObject } from '@src/shared/domain/valueObjects/valueObject';

export enum TermTypeEnum {
  WORD = 'word',
  EXPRESSION = 'expression',
}

export default class TermType extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  static of(value: string): TermType {
    const entry = Object.entries(TermTypeEnum).find(([, item]) => item === value);
    if (!entry) {
      throw new Error('Invalid type');
    }

    return new this(entry[1]);
  }

  static fromPrimitives(value: string): TermType {
    return new this(value);
  }

  isExpression(): boolean {
    return this.value === TermTypeEnum.EXPRESSION;
  }

  isWord(): boolean {
    return this.value === TermTypeEnum.WORD;
  }
}
