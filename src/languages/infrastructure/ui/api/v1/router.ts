import { Router } from 'express';
import glob from 'glob';
import JwtAuth from './routes/middlewares/jwtAuth';
import { LanguageModule } from '@src/languages/infrastructure/nestjs/language.module';
import { NestFactory } from '@nestjs/core';
import { INestApplicationContext } from '@nestjs/common';

function registerModuleRoutes(routePath: string, router: Router, container: INestApplicationContext): void {
  const route = require(routePath);

  if (typeof route.registerPublicRoutes === 'function') {
    route.registerPublicRoutes(router, container);
  }

  if (typeof route.registerLoginRequiredRoutes === 'function') {
    router.use(JwtAuth);
    route.registerLoginRequiredRoutes(router, container);
  }
}

export async function configureApiRouter(): Promise<Router> {
  const app = await NestFactory.createApplicationContext(LanguageModule);

  const router: Router = Router();
  const routes = glob.sync(__dirname + '/routes/*.*');
  routes.map((route) => registerModuleRoutes(route, router, app));

  return router;
}
