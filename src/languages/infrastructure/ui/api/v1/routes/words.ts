import { Router } from 'express';
import WordPostController from '../controllers/words/wordPostController';
import { INestApplicationContext } from '@nestjs/common';

export const registerLoginRequiredRoutes = (router: Router, app: INestApplicationContext) => {
  const wordPostController: WordPostController = app.get(WordPostController);

  router.post('/words', wordPostController.run.bind(wordPostController));
};
