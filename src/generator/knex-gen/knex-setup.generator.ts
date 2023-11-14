import Path from 'path';
import { file_ } from '../../utils/file-util.js';
import { KNEX_DIR_FRAGMENT, KNEX_DIR_NAME } from '../../constants.js';
import { KnexfileGenerator } from './knexfile.generator.js';
import { KnexDbConnectFileGenerator } from './knex-db-connect-file.generator.js';
import { packageJsonUtil } from '../../utils/package-json.util.js';
import { PackageJsonEditor } from '../../editor/package-json.editor.js';

export type KnexSetupOpts = {
  projectRoot: string;
  projectName: string;
  dbClient: string;
}

export async function KnexSetupGenerator(opts: KnexSetupOpts) {
  const { projectRoot, projectName, dbClient } = opts;

  /* Install dependencies. */
  const deps = ['knex', 'knexhelpers', 'objection'];
  if (dbClient) {
    deps.push(dbClient);
  }
  let pkgJsonUtil = packageJsonUtil({ projectRoot });
  await pkgJsonUtil.installDependencies(deps);

  const devDeps = ['ts-node', 'tsx'];
  await pkgJsonUtil.installDevDependencies(devDeps);

  /* Add knex commands to scripts */
  const pathFragment = KNEX_DIR_FRAGMENT.replace(/\/+$/, '');
  PackageJsonEditor({
    packageJsonFile: Path.join(projectRoot, 'package.json'),
    scripts: {
      'db:create-migration': `knex migrate:make -x ts --knexfile ${pathFragment}/knexfile.ts --esm`,
      'db:migrate': `NODE_OPTIONS='--loader ts-node/esm' knex migrate:latest --knexfile ${pathFragment}/knexfile.ts`,
      'db:rollback': `NODE_OPTIONS='--loader ts-node/esm' knex migrate:rollback --knexfile ${pathFragment}/knexfile.ts`,
      'db:rollback-all': `NODE_OPTIONS='--loader ts-node/esm' knex migrate:rollback --all --knexfile ${pathFragment}/knexfile.ts`,
      'db:list-migrations': `NODE_OPTIONS='--loader ts-node/esm' knex migrate:list --knexfile ${pathFragment}/knexfile.ts`,
      'db:create-seed': `NODE_OPTIONS='--loader ts-node/esm' knex seed:make --knexfile ${pathFragment}/knexfile.ts -x ts`,
      'db:seed': `NODE_OPTIONS='--loader ts-node/esm' knex seed:run --knexfile ${pathFragment}/knexfile.ts`
    }
  });

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