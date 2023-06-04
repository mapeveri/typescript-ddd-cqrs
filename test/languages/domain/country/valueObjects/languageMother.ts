import faker from 'faker';
import Language from '@src/languages/domain/country/valueObjects/language';

export interface LanguageMotherProps {
  name?: string;
  languageId?: string;
}

export default class LanguageMother {
  static random(props?: LanguageMotherProps): Language {
    const { name, languageId } = props ?? {};

    return new Language(name ?? faker.random.word(), languageId ?? faker.random.word());
  }
}
