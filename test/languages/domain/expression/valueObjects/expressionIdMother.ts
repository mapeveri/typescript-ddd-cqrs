import ExpressionId from '@src/languages/domain/term/expression/valueObjects/expressionId';
import faker from 'faker';

export class ExpressionIdMother {
  static random(id?: string): ExpressionId {
    return ExpressionId.of(id ?? faker.datatype.uuid());
  }
}
