import CreateCountryCommand from '@src/languages/application/country/command/create/createCountryCommand';
import { LanguagePrimitives } from '@src/languages/domain/country/valueObjects/language';
import { Body, Controller, HttpCode, HttpStatus, Inject, Post, UseGuards } from '@nestjs/common';
import CountryPostDto from './countryPostDto';
import { JwtAuthGuard } from '@src/shared/infrastructure/nestjs/guards/JwtAuthGuard';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { COMMAND_BUS, CommandBus } from '@src/shared/domain/buses/commandBus/commandBus';

@ApiTags('Countries')
@Controller()
export default class CountryPostController {
  public constructor(@Inject(COMMAND_BUS) private commandBus: CommandBus) {}

  @Post('countries')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @UseGuards(JwtAuthGuard)
  async run(@Body() payload: CountryPostDto): Promise<any> {
    const languages: Array<LanguagePrimitives> = payload.languages;
    await this.commandBus.dispatch(new CreateCountryCommand(payload.id, payload.name, payload.iso, languages));
    return;
  }
}
