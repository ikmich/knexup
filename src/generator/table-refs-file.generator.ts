import { file_ } from '../utils/file-util.js';
import { KNEXUP_CORE_FILENAME } from '../constants.js';
import chalk from 'chalk';

export async function tableRefsFileGenerator(targetDirPath: string) {
  // generate file for table refs
  file_.ensureDirPath(targetDirPath);
  const file = file_.joinPaths(targetDirPath, KNEXUP_CORE_FILENAME);

  if (file_.exists(file)) {
    console.log(chalk.yellow('-> table-refs file already exists'));
    return;
  }

  const tsContent = `export const tableRefs: TableRefs = {
  // add table names here
  'user': 'user',
  'settings': 'settings'
};

export const _t = tableRefs;`;

  file_.writeFile(file, tsContent);
}