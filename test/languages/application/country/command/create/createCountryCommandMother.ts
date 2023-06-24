import CreateCountryCommand from '@src/languages/application/country/command/create/createCountryCommand';
import { LanguagePrimitives } from '@src/languages/domain/country/valueObjects/language';
import faker from 'faker';

interface CreateCountryCommandProps {
  id?: string;
  name?: string;
  iso?: string;
  languages?: Array<LanguagePrimitives>;
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
