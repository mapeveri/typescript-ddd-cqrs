import { ValueTransformer } from 'typeorm';
import TermCollection from '../../../../domain/word/valueObjects/termCollection';
import Term from '../../../../domain/word/valueObjects/term';

export default class TermCollectionTransformer implements ValueTransformer {
  to(value: TermCollection): string {
    return JSON.stringify(value);
  }

  from(value: string): TermCollection {
    const parsedValue = JSON.parse(value);
    const terms = parsedValue.terms.map((term: any) => {
      return new Term(term.title, term.description, term.example, term.taggedWords);
    });
    return new TermCollection(terms);
  }
}
