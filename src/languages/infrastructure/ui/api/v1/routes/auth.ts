import { Router } from 'express';
import { ContainerBuilder } from 'node-dependency-injection';
import LoginPostController from '../controllers/auth/loginPostController';
import MeGetController from '../controllers/auth/meGetController';

export const registerPublicRoutes = (router: Router, container: ContainerBuilder) => {
  const loginPostController: LoginPostController = container.get(LoginPostController);
  router.post('/auth/login', loginPostController.run.bind(loginPostController));
};

export const registerLoginRequiredRoutes = (router: Router, container: ContainerBuilder) => {
  const meGetController: MeGetController = container.get(MeGetController);

  router.get('/auth/me', meGetController.run.bind(meGetController));
};
