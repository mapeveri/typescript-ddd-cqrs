import { Router } from 'express';
import { ContainerBuilder } from 'node-dependency-injection';
import WordPostController from '../controllers/words/wordPostController';

export const registerLoginRequiredRoutes = (router: Router, container: ContainerBuilder) => {
  const wordPostController: WordPostController = container.get(WordPostController);

  router.post('/words', wordPostController.run.bind(wordPostController));
};
