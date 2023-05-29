import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../controller';
import InvalidParameters from '@src/shared/infrastructure/api/apiErrorResponses/InvalidParameters';
import ApiExceptionSerializer from '@src/shared/infrastructure/api/serializers/apiExceptionSerializer';
import { CommandBus } from '@src/shared/domain/buses/commandBus/commandBus';
import CreateExpressionCommand from '@src/languages/application/expression/command/create/createExpressionCommand';
import { ExpressionTermDTO } from '@src/languages/domain/expression/valueObjects/expressionTerm';

export default class ExpressionPostController implements Controller {
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

      const expressionTerms: Array<ExpressionTermDTO> = this.transformExpressionTerms(body['terms']);
      await this.commandBus.dispatch(
        new CreateExpressionCommand(
          body['id'],
          body['language_id'],
          body['country_id'],
          body['user_id'],
          expressionTerms
        )
      );
      res.status(httpStatus.CREATED).send({});
    } catch (e) {
      next(e);
    }
  }

  private transformExpressionTerms(expressionTerms: Array<Record<string, any>>): Array<ExpressionTermDTO> {
    return expressionTerms.map((expressionTerm: Record<string, any>) => {
      return {
        expression: expressionTerm.expression,
        description: expressionTerm.description,
        example: expressionTerm.example,
        hashtags: expressionTerm.hashtags,
      };
    });
  }
}
