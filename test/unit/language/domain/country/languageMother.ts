import faker from 'faker';
import Language from '@src/language/domain/country/language';

export interface LanguageMotherProps {
  name?: string;
  languageId?: string;
}

export default class LanguageMother {
  static random(props?: LanguageMotherProps): Language {
    const { name, languageId } = props ?? {};

    return Language.of({ name: name ?? faker.random.word(), languageId: languageId ?? faker.random.word() });
  }
}
