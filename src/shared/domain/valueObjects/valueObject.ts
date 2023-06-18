import InvalidArgumentException from '../exceptions/invalidArgumentException';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Primitives = String | string | number | Boolean | boolean | Date;

export abstract class ValueObject<T extends Primitives> {
  readonly value: T;

  constructor(value: T) {
    this.value = value;
    this.validateValueIsDefined(value);
  }

  private validateValueIsDefined(value: T): void {
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