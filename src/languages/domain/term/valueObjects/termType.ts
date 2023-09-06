export enum TermTypeEnum {
  WORD = 'word',
  EXPRESSION = 'expression',
}

export default class TermType {
  readonly type: TermTypeEnum;

  constructor(type: TermTypeEnum) {
    if (!(type in TermTypeEnum)) {
      throw new Error('Tipo no válido');
    }

    this.type = type;
  }

  static of(type: string): TermType {
    return new this(type as TermTypeEnum);
  }

  static fromPrimitives(type: string): TermType {
    return new this(type as TermTypeEnum);
  }

  isExpression(): boolean {
    return this.type === TermTypeEnum.EXPRESSION;
  }

  isWord(): boolean {
    return this.type === TermTypeEnum.WORD;
  }
}
