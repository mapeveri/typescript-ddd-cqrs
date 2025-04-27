import faker from 'faker';
import ExpressionTerm from '@src/language/domain/term/expression/expressionTerm';

export interface ExpressionTermMotherProps {
  expression?: string;
  description?: string;
  example?: string;
  hashtags?: Array<string>;
}

export default class ExpressionTermMother {
  static random(props?: ExpressionTermMotherProps): ExpressionTerm {
    const { expression, description, example, hashtags } = props ?? {};

    return ExpressionTerm.of({
      expression: expression ?? faker.random.word(),
      description: description ?? faker.random.word(),
      example: example ?? faker.random.word(),
      hashtags: hashtags ?? ['test'],
    });
  }
}
