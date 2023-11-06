import { file_ } from '../../utils/file-util.js';
import Path from 'path';
import { shell_ } from '../../utils/shell-util.js';
import { configFileGenerator } from '../config-file.generator.js';
import { GIT_IGNORE_CONTENTS, KNEX_DIR_NAME, KNEXUP_DIR_NAME, PRETTIERRC_CONTENTS } from '../../constants.js';
import fs from 'fs-extra';
// import { fileURLToPath } from 'url';
import { tsconfigSourceContent } from './contents/tsconfig-source.content.js';
import { createRequire } from 'module';
import { logInfo, logSuccess } from '../../utils/log.util.js';
import { knexSetupGenerator } from '../knex-gen/knex-setup.generator.js';
import { knexupSetupGenerator } from '../knexup-gen/knexup-setup.generator.js';
import { packageJsonEditor } from '../../editor/package-json.editor.js';

const require = createRequire(import.meta.url);
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = Path.dirname(__filename);

/* dependencies: knex objection mysql2? pg?
$ npm install --package-lock-only knex objection
$ npm install --package-lock-only --save-dev typescript prettier @types/node
* */

const dependencies = ['knex', 'objection', 'dotenv', 'change-case'];
const devDependencies = ['@faker-js/faker', '@types/node', 'prettier', 'typescript', 'ts-node', 'tsx', 'slugify', 'rimraf'];

export async function newProjectGenerator(projectRoot: string, projectName: string, dbClient: string) {

  // console.log('[projectGenerator]', {
  //   projectRoot,
  //   // dependencies,
  //   // devDependencies
  // });

  if (dbClient) {
    dependencies.push(dbClient);
  }

  file_.ensureDirPath(projectRoot);

  // npm init
  logInfo('Initializing npm...');
  await shell_.exec(`cd ${projectRoot} && npm init -y`);
  await updatePackageJsonFile(projectRoot);
  // tsc init

  logInfo('Initializing typescript...');
  await shell_.exec(`cd ${projectRoot} && npx tsc --init`);
  updateTsconfigJsonFile(projectRoot);

  // setup package.json
  logInfo('Setting up dependencies...');
  await shell_.exec(`cd ${projectRoot} && npm install --package-lock-only ${dependencies.join(' ')}`);
  await shell_.exec(`cd ${projectRoot} && npm install --package-lock-only --save-dev ${devDependencies.join(' ')}`);

  logInfo('Generating files...');
  // [Generate folders]
  const srcDir = Path.join(projectRoot, 'src/');
  file_.ensureDirPath(srcDir);

  const knexDir = Path.join(srcDir, `${KNEX_DIR_NAME}/`);

  logInfo('Knex setup...');
  knexSetupGenerator({
    projectRoot, projectName, dbClient
  });

  logInfo('Generating knexup files...');
  const knexupDir = Path.join(knexDir, KNEXUP_DIR_NAME);
  await knexupSetupGenerator({ knexupDirPath: knexupDir });

  // [Generate files]
  configFileGenerator(projectRoot);

  const gitignoreFile = Path.join(projectRoot, '.gitignore');
  file_.writeFile(gitignoreFile, GIT_IGNORE_CONTENTS);

  const prettierConfig = Path.join(projectRoot, '.prettierrc.js');
  file_.writeFile(prettierConfig, PRETTIERRC_CONTENTS);

  const readmeFile = Path.join(projectRoot, 'README.md');
  file_.writeFile(readmeFile, `# ${projectName}`);

  const srcIndexFile = Path.join(srcDir, 'index.ts');
  file_.writeFile(srcIndexFile, `console.log('${projectName}');`);

  logSuccess('Done! Run `npm install` in the project');
}

function updateTsconfigJsonFile(projectRoot: string) {
  const tsconfigFile = Path.join(projectRoot, 'tsconfig.json');
  fs.writeFileSync(tsconfigFile, tsconfigSourceContent);
}

async function updatePackageJsonFile(projectRoot: string) {
  packageJsonEditor({
    packageJsonFile: Path.join(projectRoot, 'package.json'),
    type: 'module',
    engines: {
      node: '>=18'
    },
    scripts: {
      'lint': `prettier --check .`,
      'lint-fix': `prettier --write .`,
      'db-migration-new': `knex migrate:make -x ts --knexfile src/db/knexfile.ts --esm`,
      'db-migrate-up': `NODE_OPTIONS='--loader ts-node/esm' knex migrate:latest --knexfile src/db/knexfile.ts`,
      'db-migrate-down': `NODE_OPTIONS='--loader ts-node/esm' knex migrate:rollback --knexfile src/db/knexfile.ts`,
      'db-list-migrations': `NODE_OPTIONS='--loader ts-node/esm' knex migrate:list --knexfile src/db/knexfile.ts`,
      'db-seed-new': `NODE_OPTIONS='--loader ts-node/esm' knex seed:make --knexfile src/db/knexfile.ts -x ts`,
      'db-seed': `NODE_OPTIONS='--loader ts-node/esm' knex seed:run --knexfile src/db/knexfile.ts`
    }
  });
}
