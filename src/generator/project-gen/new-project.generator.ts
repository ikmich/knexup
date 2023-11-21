import { file_ } from '../../utils/file-util.js';
import Path from 'path';
import { shell_ } from '../../utils/shell-util.js';
import { ConfigFileGenerator } from '../config-file.generator.js';
import { GIT_IGNORE_CONTENTS, PRETTIERRC_CONTENTS } from '../../constants.js';
import fs from 'fs-extra';
import { tsconfigSourceContent } from './contents/tsconfig-source.content.js';
import { logInfo, logSuccess } from '../../utils/log.util.js';
import { KnexSetupGenerator } from '../knex-gen/knex-setup.generator.js';
import { KnexupSetupGenerator } from '../knexup-gen/knexup-setup.generator.js';
import { PackageJsonEditor } from '../../editor/package-json.editor.js';
import { knexupUtil } from '../../utils/knexup-util.js';

// todo - move to global constant
const dependencies = ['knex', 'knexhelpers', 'objection', 'dotenv'];
const devDependencies = ['@faker-js/faker', '@types/node', 'prettier', 'typescript', 'ts-node', 'tsx'];

export async function NewProjectGenerator(projectRoot: string, projectName: string, dbClient: string) {

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

  const knexDirSegment = await knexupUtil.getKnexDirSegment();
  const knexDirPath = Path.join(projectRoot, knexDirSegment);
  // const knexDir = Path.join(srcDir, `${KNEX_DIR_NAME_DEFAULT}/`);

  logInfo('Knex setup...');
  await KnexSetupGenerator({
    projectRoot, projectName, dbClient
  });

  logInfo('Generating knexup files...');
  await KnexupSetupGenerator({ projectRoot });

  // [Generate files]
  ConfigFileGenerator(projectRoot);

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
  PackageJsonEditor({
    packageJsonFile: Path.join(projectRoot, 'package.json'),
    moduleType: 'module',
    engines: {
      node: '>=18'
    }
  });
}
