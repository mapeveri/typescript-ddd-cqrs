export enum TermTypeEnum {
  WORD = 'word',
  EXPRESSION = 'expression',
}

export default class TermType {
  readonly type: string;

  constructor(type: string) {
    const entry = Object.entries(TermTypeEnum).find(([, item]) => item === type);
    if (!entry) {
      throw new Error('Tipo no válido');
    }

    this.type = entry[0];
  }

  static of(type: string): TermType {
    return new this(type);
  }

  static fromPrimitives(type: string): TermType {
    return new this(type);
  }

  isExpression(): boolean {
    return this.type === TermTypeEnum.EXPRESSION;
  }

  isWord(): boolean {
    return this.type === TermTypeEnum.WORD;
  }
}
