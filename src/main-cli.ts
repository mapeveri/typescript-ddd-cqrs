import 'dotenv/config';
import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';
import { DataSourceHandler } from './shared/infrastructure/persistence/typeOrm/dataSourceHandler';

async function bootstrap() {
  await CommandFactory.run(AppModule, ['warn', 'error']);

  await DataSourceHandler.getInstance().initialize();
}

bootstrap()
  .then(async () => {
    console.info('command bootstrapped ...!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('server failed to start command', err);
    process.exit(1);
  });
