import { Command } from 'commander';
import { configFileGenerator } from '../../generator/config-file.generator.js';
import { tableRefsFileGenerator } from '../../generator/table-refs-file.generator.js';
import { knexupUtil } from '../../utils/knexup-util.js';
import { file_ } from '../../utils/file-util.js';
import { PROJECT_ROOT } from '../../constants.js';
import Path from 'path';

export async function processBootstrapCommand(command: Command) {
  configFileGenerator(PROJECT_ROOT);

  // create knexup dir
  const knexupDir = await knexupUtil.getKnexupDir();
  file_.ensureDirPath(Path.join(PROJECT_ROOT, knexupDir));

  await tableRefsFileGenerator(knexupDir);
}
