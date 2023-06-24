import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../controller';
import CreateWordCommand from '@src/languages/application/word/command/create/createWordCommand';
import InvalidParameters from '@src/shared/infrastructure/api/apiErrorResponses/InvalidParameters';
import ApiExceptionSerializer from '@src/shared/infrastructure/api/serializers/apiExceptionSerializer';
import { CommandBus } from '@src/shared/domain/buses/commandBus/commandBus';
import { WordTermPrimitives } from '@src/languages/domain/word/valueObjects/wordTerm';

export default class WordPostController implements Controller {
  public constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const body = req.body;
      if (
        !('id' in body) ||
        !('language_id' in body) ||
        !('country_id' in body) ||
        !('user_id' in body) ||
        !('terms' in body)
      ) {
        const error = new InvalidParameters();
        res.status(error.status).json(ApiExceptionSerializer.serialize(error));
      }

      const wordTerms: Array<WordTermPrimitives> = this.transformWordTerms(body['terms']);
      await this.commandBus.dispatch(
        new CreateWordCommand(body['id'], body['language_id'], body['country_id'], body['user_id'], wordTerms)
      );
      res.status(httpStatus.CREATED).send({});
    } catch (e) {
      next(e);
    }
  }

  private transformWordTerms(wordTerms: Array<Record<string, any>>): Array<WordTermPrimitives> {
    return wordTerms.map((wordTerm: Record<string, any>) => {
      return {
        word: wordTerm.word,
        description: wordTerm.description,
        example: wordTerm.example,
        hashtags: wordTerm.hashtags,
      };
    });
  }
}
