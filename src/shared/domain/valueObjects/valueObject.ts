import InvalidArgumentException from '../exceptions/invalidArgumentException';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Primitives = String | string | number | Boolean | boolean | Date;

export abstract class ValueObject<T extends Primitives> {
  readonly value: T;

  constructor(value: T) {
    this.value = value;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static fromPrimitives(value: string): any {
    throw Error('Not implemented');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static of(value: string): any {
    throw Error('Not implemented');
  }

  validateValueIsDefined(value: T): void {
    if (value === null || value === undefined) {
      throw new InvalidArgumentException();
    }
  }

  equals(other: ValueObject<T>): boolean {
    return other.constructor.name === this.constructor.name && other.value === this.value;
  }

  toString(): string {
    return this.value.toString();
  }
}
