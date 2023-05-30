import { Router } from 'express';
import { ContainerBuilder } from 'node-dependency-injection';
import SearchTermsGetController from '../controllers/terms/searchTermsGetController';

export const registerLoginRequiredRoutes = (router: Router, container: ContainerBuilder) => {
  const searchTermsGetController: SearchTermsGetController = container.get(SearchTermsGetController);

  router.get('/search/:term', searchTermsGetController.run.bind(searchTermsGetController));
};
