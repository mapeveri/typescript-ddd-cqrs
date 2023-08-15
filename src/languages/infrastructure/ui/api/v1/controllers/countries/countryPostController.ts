import CreateCountryCommand from '@src/languages/application/country/command/create/createCountryCommand';
import { COMMAND_BUS, CommandBus } from '@src/shared/domain/buses/commandBus/commandBus';
import { LanguagePrimitives } from '@src/languages/domain/country/valueObjects/language';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import CountryPostDto from './countryPostDto';
import { JwtAuthGuard } from '@src/shared/infrastructure/nestjs/guards/JwtAuthGuard';

@Controller()
export default class CountryPostController {
  public constructor(@Inject(COMMAND_BUS) private commandBus: CommandBus) {}

  @Post('countries')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async run(@Body() payload: CountryPostDto): Promise<any> {
    const languages: Array<LanguagePrimitives> = payload.languages;
    await this.commandBus.dispatch(new CreateCountryCommand(payload.id, payload.name, payload.iso, languages));
    return;
  }
}
