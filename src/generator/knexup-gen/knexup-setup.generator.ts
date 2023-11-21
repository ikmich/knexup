import { file_ } from '../../utils/file-util.js';
import { TableInitSetupGenerator } from '../table-init/table-init-setup.generator.js';

export type KnexupSetupOpts = {
  projectRoot: string;
  tables?: string[];
}

/**
 * Setup knexup files.
 * @param opts
 */
export async function KnexupSetupGenerator(opts: KnexupSetupOpts) {
  const { projectRoot, tables = [] } = opts;

  file_.ensureDirPath(projectRoot);

  await TableInitSetupGenerator({
    tables,
    projectRoot
  });
}