import { file_ } from '../../utils/file-util.js';
import Path from 'path';
import { knexfileGenerator } from './knexfile.generator.js';
import { shell_ } from '../../utils/shell-util.js';
import { configFileGenerator } from '../config-file.generator.js';
import { GIT_IGNORE_CONTENTS, KNEXUP_DIR_NAME, KNEXUP_INIT_DIR_NAME, PRETTIERRC_CONTENTS } from '../../constants.js';
import { tableRefsFileGenerator } from '../table-refs-file.generator.js';
import { knexupFileGenerator } from '../knexup-file.generator.js';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { tsconfigSourceContent } from './contents/tsconfig-source.content.js';
import { dbKnexSetupFileGenerator } from './db-knex-setup-file.generator.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

/* dependencies: knex objection mysql2? pg?
$ npm install --package-lock-only knex objection
$ npm install --package-lock-only --save-dev typescript prettier @types/node
* */

const dependencies = ['knex', 'objection', 'dotenv', 'change-case'];
const devDependencies = ['@faker-js/faker', '@types/node', 'prettier', 'typescript', 'ts-node', 'slugify', 'rimraf'];

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

  console.log('Initializing npm...');
  // npm init
  await shell_.exec(`cd ${projectRoot} && npm init -y`);
  await updatePackageJsonFile(projectRoot);

  console.log('Initializing typescript...');
  // tsc init
  await shell_.exec(`cd ${projectRoot} && npx tsc --init`);
  updateTsconfigJsonFile(projectRoot);

  console.log('Setting up dependencies...');
  // setup package.json
  await shell_.exec(`cd ${projectRoot} && npm install --package-lock-only ${dependencies.join(' ')}`);
  await shell_.exec(`cd ${projectRoot} && npm install --package-lock-only --save-dev ${devDependencies.join(' ')}`);

  console.log('Generating files...');
  // [Generate folders]
  const srcDir = Path.join(projectRoot, 'src/');
  file_.ensureDirPath(srcDir);

  const dbDir = Path.join(srcDir, 'db/');
  file_.ensureDirPath(dbDir);

  const knexDir = dbDir;

  const knexMigrationsDir = Path.join(knexDir, 'migrations/');
  file_.ensureDirPath(knexMigrationsDir);

  const knexupDir = Path.join(dbDir, KNEXUP_DIR_NAME);
  file_.ensureDirPath(knexupDir);

  const knexupInitDir = Path.join(knexupDir, KNEXUP_INIT_DIR_NAME);
  file_.ensureDirPath(knexupInitDir);

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

  console.log('Generating knexfile...');
  const knexfilePath = Path.join(knexDir, 'knexfile.ts');
  // file_.writeFile(knexfilePath, '');
  knexfileGenerator({
    knexfilePath,
    projectName,
    projectRoot,
    dbClient
  });

  console.log('Setting db.knex configuration...');
  const dbKnexFilePath = Path.join(dbDir, 'db.knex.ts');
  dbKnexSetupFileGenerator(dbKnexFilePath);
  // file_.writeFile(dbKnexFilePath, '');

  console.log('Generating knexup files...');
  await tableRefsFileGenerator(knexupDir);
  await knexupFileGenerator(knexupDir);

  console.log(`Done!`);
}

function updateTsconfigJsonFile(projectRoot: string) {
  const tsconfigFile = Path.join(projectRoot, 'tsconfig.json');
  fs.writeFileSync(tsconfigFile, tsconfigSourceContent);
}

async function updatePackageJsonFile(projectRoot: string) {
  let packageJsonFile = Path.join(projectRoot, 'package.json');
  const config: any = require(packageJsonFile);
  // const config: any = (await import(packageJsonFile, {
  //   assert: { type: 'json' }
  // }))?.default;

  if (config) {
    // "type"
    config['type'] = 'module';

    // "engines"
    config['engines'] = {
      node: '>=16'
    };

    const configJson = JSON.stringify(config, null, 2);
    fs.writeFileSync(packageJsonFile, configJson);
  }
}
