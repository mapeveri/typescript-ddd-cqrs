import CreateCountryCommand from '@src/languages/application/country/command/create/createCountryCommand';
import { LanguageDTO } from '@src/languages/domain/country/valueObjects/language';
import faker from 'faker';

interface CreateCountryCommandProps {
  id?: string;
  name?: string;
  iso?: string;
  languages?: Array<LanguageDTO>;
}

export class CreateCountryCommandMother {
  static random(props?: CreateCountryCommandProps): CreateCountryCommand {
    const { id, name, iso, languages } = props ?? {};

    return new CreateCountryCommand(
      id ?? faker.datatype.uuid(),
      name ?? faker.name.findName(),
      iso ?? faker.random.word(),
      languages ?? [{ name: faker.random.word(), languageId: faker.random.word() }]
    );
  }
}
