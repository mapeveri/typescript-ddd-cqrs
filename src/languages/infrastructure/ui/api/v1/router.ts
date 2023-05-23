import { Router } from 'express';
import glob from 'glob';
import JwtAuth from './routes/middlewares/jwtAuth';
import { ContainerBuilder } from 'node-dependency-injection';

function registerModuleRoutes(routePath: string, router: Router, container: ContainerBuilder): void {
  const route = require(routePath);

  if (typeof route.registerPublicRoutes === 'function') {
    route.registerPublicRoutes(router, container);
  }

  if (typeof route.registerLoginRequiredRoutes === 'function') {
    router.use(JwtAuth);
    route.registerLoginRequiredRoutes(router, container);
  }
}

export function registerRoutes(router: Router, container: ContainerBuilder): void {
  const routes = glob.sync(__dirname + '/routes/*.*');
  routes.map((route) => registerModuleRoutes(route, router, container));
}
