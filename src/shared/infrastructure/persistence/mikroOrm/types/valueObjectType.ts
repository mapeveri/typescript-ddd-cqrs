import { Type, Platform } from '@mikro-orm/core';
import { Primitives, ValueObject } from '@src/shared/domain/valueObjects/valueObject';

export abstract class ValueObjectType<T extends Primitives> extends Type<ValueObject<T>, T> {
  private ValueObject: any;

  constructor(ValueObject: any) {
    super();
    this.ValueObject = ValueObject;
  }

  convertToDatabaseValue(value: ValueObject<T> | undefined, _platform: Platform): T {
    if (!value) {
      return value as unknown as T;
    }
    return value.value;
  }

  convertToJSValue(value: T | undefined, _platform: Platform): ValueObject<T> {
    if (!value) {
      return value as unknown as ValueObject<T>;
    }
    return this.ValueObject.fromPrimitives(value);
  }

  abstract getColumnType(): string;
}
