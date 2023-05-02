import { Router } from 'express';
import { LoginPostController } from '../controllers/auth/loginPostController';
import { MeGetController } from '../controllers/auth/meGetController';
import JwtAuth from './middlewares/jwtAuth';

function routesWithLoginRequired(router: Router) {
  const meGetController: MeGetController = new MeGetController();

  router.use(JwtAuth);
  router.get('/auth/me', meGetController.run.bind(meGetController));
}

export const register = (router: Router) => {
  const loginPostController: LoginPostController = new LoginPostController();
  router.post('/auth/login', loginPostController.run.bind(loginPostController));

  routesWithLoginRequired(router);
};
