import { Router } from 'express';
import ExpressionPostController from '../controllers/expressions/expressionPostController';
import { INestApplicationContext } from '@nestjs/common';

export const registerLoginRequiredRoutes = (router: Router, app: INestApplicationContext) => {
  const expressionPostController: ExpressionPostController = app.get(ExpressionPostController);

  router.post('/expressions', expressionPostController.run.bind(expressionPostController));
};
