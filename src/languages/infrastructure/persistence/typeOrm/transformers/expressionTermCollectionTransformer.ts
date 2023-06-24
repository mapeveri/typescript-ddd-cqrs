import ExpressionTerm, { ExpressionTermPrimitives } from '@src/languages/domain/expression/valueObjects/expressionTerm';
import ExpressionTermCollection from '@src/languages/domain/expression/valueObjects/expressionTermCollection';
import { ValueTransformer } from 'typeorm';

export default class ExpressionTermCollectionTransformer implements ValueTransformer {
  to(value: ExpressionTermCollection): string {
    return JSON.stringify(value);
  }

  from(value: string): ExpressionTermCollection {
    const parsedValue = JSON.parse(value);
    const terms = parsedValue.terms.map((term: any) => {
      const expressionTerm: ExpressionTermPrimitives = {
        expression: term.title,
        description: term.description,
        example: term.example,
        hashtags: term.taggedWords,
      };

      return ExpressionTerm.fromPrimitives(expressionTerm);
    });
    return ExpressionTermCollection.fromPrimitives(terms);
  }
}
