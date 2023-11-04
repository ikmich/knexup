import { tableRefsFileGenerator } from '../table-refs-file.generator.js';
import Path from 'path';
import { KNEXUP_INIT_DIR_NAME } from '../../constants.js';
import { file_ } from '../../utils/file-util.js';

export type KnexupSetupOpts = {
  knexupDirPath: string;
}

/**
 * Setup knexup files.
 * @param opts
 */
export async function knexupSetupGenerator(opts: KnexupSetupOpts) {
  const { knexupDirPath } = opts;
  file_.ensureDirPath(knexupDirPath);

  await tableRefsFileGenerator(knexupDirPath);
  // await knexupFileGenerator(knexupDir);

  const knexupInitDir = Path.join(knexupDirPath, KNEXUP_INIT_DIR_NAME);
  file_.ensureDirPath(knexupInitDir);
}