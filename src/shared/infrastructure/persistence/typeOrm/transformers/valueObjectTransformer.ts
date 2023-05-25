import { NewableClass } from '@src/shared/domain/newableClass';
import { Primitives, ValueObject } from '@src/shared/domain/valueObjects/valueObject';

export const ValueObjectTransformer = <T extends Primitives>(ValueObject: NewableClass<ValueObject<any>>) => {
  return {
    to: (value: ValueObject<T>): T => value.value,
    from: (value: T): ValueObject<T> => new ValueObject(value),
  };
};
