import { Router } from 'express';
import { WordPostController } from '../controllers/words/wordPostController';

export const register = (router: Router) => {
  const wordPostController: WordPostController = new WordPostController();

  router.post('/words', wordPostController.run.bind(wordPostController));
};
