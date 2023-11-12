import Path from 'path';
import { file_ } from '../../utils/file-util.js';
import { KNEX_DIR_NAME } from '../../constants.js';
import { KnexfileGenerator } from './knexfile.generator.js';
import { KnexDbConnectFileGenerator } from './knex-db-connect-file.generator.js';
import { packageJsonUtil } from '../../utils/package-json.util.js';

export type KnexSetupOpts = {
  projectRoot: string;
  projectName: string;
  dbClient: string;
}

export async function KnexSetupGenerator(opts: KnexSetupOpts) {
  const { projectRoot, projectName, dbClient } = opts;

  const deps = ['knex', 'knexhelpers', 'objection'];
  if (dbClient) {
    deps.push(dbClient);
  }

  await packageJsonUtil.installDependencies(deps);

  const srcDir = Path.join(projectRoot, 'src/');
  file_.ensureDirPath(srcDir);

  const knexDir = Path.join(srcDir, `${KNEX_DIR_NAME}/`);
  file_.ensureDirPath(knexDir);

  const knexMigrationsDir = Path.join(knexDir, 'migrations/');
  file_.ensureDirPath(knexMigrationsDir);

  const knexfilePath = Path.join(knexDir, 'knexfile.ts');

  KnexfileGenerator({
    knexfilePath,
    projectName,
    projectRoot,
    dbClient
  });

  const dbKnexFilePath = Path.join(knexDir, 'knex.db.ts');
  KnexDbConnectFileGenerator(dbKnexFilePath);
}