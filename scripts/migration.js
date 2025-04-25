const { execSync } = require('child_process');

const [, , schema, command] = process.argv;

if (!schema || !command) {
  console.error('❌ Uso: npm run migration <schema> <command>');
  console.error('Example: npm run migration account up');
  process.exit(1);
}

const configPath = `./src/${schema}/mikroOrmConfig.ts`;

console.log(configPath);

const fullCommand = `npx mikro-orm migration:${command} --config ${configPath}`;

try {
  execSync(fullCommand, { stdio: 'inherit' });
} catch (err) {
  console.error(`❌ Error executing: "${fullCommand}"`);
  process.exit(1);
}
