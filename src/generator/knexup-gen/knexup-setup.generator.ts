import { tableRefsFileGenerator } from '../table-refs-file.generator.js';
import { file_ } from '../../utils/file-util.js';

export type KnexupSetupOpts = {
  knexupDirPath: string;
  table?: string;
}

/**
 * Setup knexup files.
 * @param opts
 */
export async function KnexupSetupGenerator(opts: KnexupSetupOpts) {
  const { knexupDirPath, table } = opts;
  file_.ensureDirPath(knexupDirPath);

  await tableRefsFileGenerator(knexupDirPath, table);
}