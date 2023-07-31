import { Router } from 'express';
import LoginPostController from '../controllers/auth/loginPostController';
import MeGetController from '../controllers/auth/meGetController';
import { INestApplicationContext } from '@nestjs/common';

export const registerPublicRoutes = (router: Router, app: INestApplicationContext) => {
  const loginPostController: LoginPostController = app.get(LoginPostController);
  router.post('/auth/login', loginPostController.run.bind(loginPostController));
};

export const registerLoginRequiredRoutes = (router: Router, app: INestApplicationContext) => {
  const meGetController: MeGetController = app.get(MeGetController);

  router.get('/auth/me', meGetController.run.bind(meGetController));
};
