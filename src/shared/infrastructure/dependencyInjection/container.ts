import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';

async function getContainer(): Promise<ContainerBuilder> {
  const container = new ContainerBuilder();
  const loader = new YamlFileLoader(container);

  await loader.load(`${__dirname}/application.yaml`);

  return container;
}

export default getContainer;
