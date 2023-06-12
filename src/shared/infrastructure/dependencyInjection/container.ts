import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';
import { ExpressApp } from '../express/expressApp';

async function configureContainer(app: ExpressApp): Promise<ContainerBuilder> {
  const serviceFilePath = `${app.locals.sourcePath}/shared/infrastructure/dependencyInjection`;
  const container = new ContainerBuilder(false, app.locals.sourcePath);

  const loader = new YamlFileLoader(container);
  await loader.load(`${serviceFilePath}/services.yaml`);

  if (app.isProduction()) {
    await container.compile();
  }

  return container;
}

export default configureContainer;
