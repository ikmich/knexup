import Path from 'path';
import { file_ } from '../../utils/file-util.js';
import { KNEX_DIR_NAME } from '../../constants.js';
import { knexfileGenerator } from '../project-gen/knexfile.generator.js';
import { logInfo } from '../../utils/log.util.js';
import { dbKnexFileGenerator } from '../project-gen/db-knex-file.generator.js';

export type KnexSetupOpts = {
  projectRoot: string;
  projectName: string;
  dbClient: string;
}

export function knexSetupGenerator(opts: KnexSetupOpts) {
  const { projectRoot, projectName, dbClient } = opts;

  const srcDir = Path.join(projectRoot, 'src/');
  file_.ensureDirPath(srcDir);

  const knexDir = Path.join(srcDir, `${KNEX_DIR_NAME}/`);
  file_.ensureDirPath(knexDir);

  const knexMigrationsDir = Path.join(knexDir, 'migrations/');
  file_.ensureDirPath(knexMigrationsDir);

  const knexfilePath = Path.join(knexDir, 'knexfile.ts');

  knexfileGenerator({
    knexfilePath,
    projectName,
    projectRoot,
    dbClient
  });

  const dbKnexFilePath = Path.join(knexDir, 'db.ts');
  dbKnexFileGenerator(dbKnexFilePath);
}