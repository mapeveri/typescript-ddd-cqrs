import faker from 'faker';
import ExpressionTerm from '@src/languages/domain/expression/valueObjects/expressionTerm';

export interface ExpressionTermMotherProps {
  expression?: string;
  description?: string;
  example?: string;
  hashtags?: Array<string>;
}

export default class ExpressionTermMother {
  static random(props?: ExpressionTermMotherProps): ExpressionTerm {
    const { expression, description, example, hashtags } = props ?? {};

    return new ExpressionTerm(
      expression ?? faker.random.word(),
      description ?? faker.random.word(),
      example ?? faker.random.word(),
      hashtags ?? ['test']
    );
  }
}
