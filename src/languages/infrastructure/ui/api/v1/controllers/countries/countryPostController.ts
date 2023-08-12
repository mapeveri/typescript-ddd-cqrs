import CreateCountryCommand from '@src/languages/application/country/command/create/createCountryCommand';
import { COMMAND_BUS, CommandBus } from '@src/shared/domain/buses/commandBus/commandBus';
import { LanguagePrimitives } from '@src/languages/domain/country/valueObjects/language';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import CountryPostDto from './countryPostDto';

@Controller()
export default class CountryPostController {
  public constructor(@Inject(COMMAND_BUS) private commandBus: CommandBus) {}

  @Post('countries')
  @HttpCode(HttpStatus.CREATED)
  async run(@Body() payload: CountryPostDto): Promise<any> {
    const languages: Array<LanguagePrimitives> = this.transformLanguages(payload.languages);
    await this.commandBus.dispatch(new CreateCountryCommand(payload.id, payload.name, payload.iso, languages));
    return;
  }

  private transformLanguages(languages: Array<Record<string, any>>): Array<LanguagePrimitives> {
    return languages.map((language: Record<string, any>) => {
      return {
        languageId: language['language_id'],
        name: language['name'],
      };
    });
  }
}
