import { Autowire, ContainerBuilder, ServiceFile, YamlFileLoader } from 'node-dependency-injection';
import { ExpressApp } from '../express/expressApp';

async function getContainer(app: ExpressApp): Promise<ContainerBuilder> {
  const container = new ContainerBuilder(false, app.locals.sourcePath);

  const loader = new YamlFileLoader(container);
  await loader.load(`${__dirname}/services.yaml`);

  if (app.isProduction()) {
    const autowire = new Autowire(container);
    autowire.serviceFile = new ServiceFile(`${__dirname}/services.yaml`, true);
    await autowire.process();
    await container.compile();
  }

  return container;
}

export default getContainer;
