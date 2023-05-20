import { ValueTransformer } from 'typeorm';
import ExpressionTermCollection from '../../../../domain/expression/valueObjects/expressionTermCollection';
import ExpressionTerm from '../../../../domain/expression/valueObjects/expressionTerm';

export default class ExpressionTermCollectionTransformer implements ValueTransformer {
  to(value: ExpressionTermCollection): string {
    return JSON.stringify(value);
  }

  from(value: string): ExpressionTermCollection {
    const parsedValue = JSON.parse(value);
    const terms = parsedValue.terms.map((term: any) => {
      return new ExpressionTerm(term.title, term.description, term.example, term.taggedWords);
    });
    return new ExpressionTermCollection(terms);
  }
}
