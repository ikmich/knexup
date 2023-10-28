import { file_ } from '../utils/file-util.js';
import { TABLE_REFS_FILENAME } from '../constants.js';
import chalk from 'chalk';
import { tableRefsContent } from './contents/table-refs.content.js';

export async function tableRefsFileGenerator(targetDirPath: string) {
  file_.ensureDirPath(targetDirPath);

  let filename = TABLE_REFS_FILENAME;
  const file = file_.joinPaths(targetDirPath, filename);

  if (file_.exists(file)) {
    return;
  }

  file_.writeFile(file, tableRefsContent);
  console.log(chalk.blueBright(`-> ${filename} created in ${targetDirPath}`));
}