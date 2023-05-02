import { Router } from 'express';
import glob from 'glob';
import JwtAuth from './routes/middlewares/jwtAuth';

const routesWithoutLogin = ['/routes/auth'];

function register(routePath: string, router: Router) {
  const route = require(routePath);

  if (!routesWithoutLogin.includes(routePath.split('v1')[1].split('.')[0])) {
    router.use(JwtAuth);
  }
  route.register(router, JwtAuth);
}

export function registerRoutes(router: Router) {
  const routes = glob.sync(__dirname + '/routes/*.*');
  routes.map((route) => register(route, router));
}
