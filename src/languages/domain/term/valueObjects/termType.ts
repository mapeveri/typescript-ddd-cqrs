export enum TermTypeEnum {
  WORD = 'word',
  EXPRESSION = 'expression',
}

export default class TermType {
  readonly value: string;

  constructor(type: string) {
    const entry = Object.entries(TermTypeEnum).find(([, item]) => item === type);
    if (!entry) {
      throw new Error('Tipo no válido');
    }

    this.value = entry[1];
  }

  static of(type: string): TermType {
    return new this(type);
  }

  static fromPrimitives(type: string): TermType {
    return new this(type);
  }

  isExpression(): boolean {
    return this.value === TermTypeEnum.EXPRESSION;
  }

  isWord(): boolean {
    return this.value === TermTypeEnum.WORD;
  }
}
