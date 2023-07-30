import { Router } from 'express';
import SearchTermsGetController from '../controllers/terms/searchTermsGetController';
import { INestApplicationContext } from '@nestjs/common';

export const registerLoginRequiredRoutes = (router: Router, app: INestApplicationContext) => {
  const searchTermsGetController: SearchTermsGetController = app.get(SearchTermsGetController);

  router.get('/search/:term', searchTermsGetController.run.bind(searchTermsGetController));
};
