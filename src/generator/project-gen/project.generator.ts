import { file_ } from '../../utils/file-util.js';
import Path from 'path';
import { knexfileGenerator } from './knexfile.generator.js';
import { shell_ } from '../../utils/shell-util.js';
import { configFileGenerator } from '../config-file.generator.js';
import { GIT_IGNORE_CONTENTS, PRETTIERRC_CONTENTS } from '../../constants.js';

/* dependencies: knex objection mysql2? pg?
$ npm install --package-lock-only knex objection
$ npm install --package-lock-only --save-dev typescript prettier @types/node
* */

const dependencies = ['knex', 'objection', 'dotenv', 'change-case'].join(' ');
const devDependencies = ['@faker-js/faker', '@types/node', 'prettier', 'typescript', 'ts-node', 'sqlite3'].join(' ');

export async function projectGenerator(projectRoot: string, projectName: string) {

  // console.log('[projectGenerator]', {
  //   projectRoot,
  //   // dependencies,
  //   // devDependencies
  // });

  file_.ensureDirPath(projectRoot);

  // npm init
  await shell_.exec(`cd ${projectRoot} && npm init -y`);

  // setup package.json
  await shell_.exec(`cd ${projectRoot} && npm install --package-lock-only ${dependencies}`);
  await shell_.exec(`cd ${projectRoot} && npm install --package-lock-only --save-dev ${devDependencies}`);

  // tsc init
  await shell_.exec(`cd ${projectRoot} && npx tsc --init`);

  // Generate folders

  const srcDir = Path.join(projectRoot, 'src/');
  file_.ensureDirPath(srcDir);

  const dbDir = Path.join(srcDir, 'db/');
  file_.ensureDirPath(dbDir);

  const knexDir = dbDir;
  // const knexDir = Path.join(srcDir, 'knex/');
  // file_.ensureDirPath(knexDir);

  const knexMigrationsDir = Path.join(knexDir, 'migrations/');
  file_.ensureDirPath(knexMigrationsDir);

  const knexupInitDir = Path.join(knexDir, 'init/');
  file_.ensureDirPath(knexupInitDir);

  // Generate files
  configFileGenerator(projectRoot);

  const gitignoreFile = Path.join(projectRoot, '.gitignore');
  file_.writeFile(gitignoreFile, GIT_IGNORE_CONTENTS);

  const prettierConfig = Path.join(projectRoot, '.prettierrc.js');
  file_.writeFile(prettierConfig, PRETTIERRC_CONTENTS);

  const readmeFile = Path.join(projectRoot, 'README.md');
  file_.writeFile(readmeFile, `# ${projectName}`);

  const srcIndexFile = Path.join(srcDir, 'index.ts');
  file_.writeFile(srcIndexFile, `console.log('${projectName}');`);

  const knexfilePath = Path.join(knexDir, 'knexfile.ts');
  file_.writeFile(knexfilePath, '');
  knexfileGenerator(knexfilePath, projectName, projectRoot);

  const knexConfigFilePath = Path.join(srcDir, 'knex.config.ts');
  file_.writeFile(knexConfigFilePath, '');

}
