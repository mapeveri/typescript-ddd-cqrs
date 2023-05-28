import { Router } from 'express';
import { ContainerBuilder } from 'node-dependency-injection';
import ExpressionPostController from '../controllers/expressions/expressionPostController';

export const registerLoginRequiredRoutes = (router: Router, container: ContainerBuilder) => {
  const expressionPostController: ExpressionPostController = container.get(ExpressionPostController);

  router.post('/expressions', expressionPostController.run.bind(expressionPostController));
};
