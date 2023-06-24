import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';
import InvalidArgumentException from '../exceptions/invalidArgumentException';
import { ValueObject } from './valueObject';

export class Uuid extends ValueObject<string> {
  protected constructor(value: string) {
    super(value);
  }

  static fromPrimitives(value: string): Uuid {
    return new this(value);
  }

  static of(value: string): Uuid {
    const instance = new this(value);
    instance.validateValueIsDefined(value);
    instance.validateUuid(value);
    return instance;
  }

  static random(): Uuid {
    return new Uuid(uuidv4());
  }

  static fromString(value: string): Uuid {
    return new Uuid(uuidv5(value, uuidv5.DNS));
  }

  private validateUuid(id: string): void {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(id)) {
      throw new InvalidArgumentException(`<${this.constructor.name}> does not allow the value <${id}>`);
    }
  }
}
