import { ValueTransformer } from 'typeorm';
import WordTermCollection from '../../../../domain/word/valueObjects/wordTermCollection';
import WordTerm from '../../../../domain/word/valueObjects/wordTerm';

export default class WordTermCollectionTransformer implements ValueTransformer {
  to(value: WordTermCollection): string {
    return JSON.stringify(value);
  }

  from(value: string): WordTermCollection {
    const parsedValue = JSON.parse(value);
    const terms = parsedValue.terms.map((term: any) => {
      return new WordTerm(term.title, term.description, term.example, term.taggedWords);
    });
    return new WordTermCollection(terms);
  }
}
