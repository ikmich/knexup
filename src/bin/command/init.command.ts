import { Command } from 'commander';
import { tableInitFileGenerator } from '../../generator/table-init-file.generator.js';
import { table_ } from '../../utils/index.js';
import Path from 'path';
import { CliOptions } from '../../types.js';
import { PROJECT_ROOT } from '../../constants.js';
import { configFileGenerator } from '../../generator/config-file.generator.js';
import { knexupUtil } from '../../utils/knexup-util.js';
import { file_ } from '../../utils/file-util.js';
import { tableRefsFileGenerator } from '../../generator/table-refs-file.generator.js';
import { knexupFileGenerator } from '../../generator/knexup-file.generator.js';
import { logError, logNotice } from '../../utils/log.util.js';

async function createKnexupFile() {
  // create knexup dir
  const knexupDir = await knexupUtil.getKnexupDir();
  file_.ensureDirPath(Path.join(PROJECT_ROOT, knexupDir));
  await knexupFileGenerator(knexupDir);
}

async function createTableRefsFile(table?: string | null) {
  // create knexup dir
  const knexupDir = await knexupUtil.getKnexupDir();
  file_.ensureDirPath(Path.join(PROJECT_ROOT, knexupDir));
  await tableRefsFileGenerator(knexupDir, table);
}

export async function processInitCommand(command: Command) {
  const opts = command.opts<CliOptions>();
  const args = command.args;
  const arg0 = args[0]?.trim() || null;
  const arg1 = args[1]?.trim() || null;

  const params = {
    table: null as string | null
  };

  configFileGenerator(PROJECT_ROOT);
  await createKnexupFile();

  if (opts.table?.trim()) {
    params.table = opts.table?.trim();
  }

  await createTableRefsFile(params.table);

  // console.log('[processInitCommand2]', {
  //   args,
  //   opts,
  //   state: params,
  //   arg0,
  //   arg1
  // });

  if (params.table) {
    /* Validate table name. */
    if (!table_.isValidTable(params.table)) {
      logError('!ERROR! Invalid table name');
      return;
    }

    const destDir = await knexupUtil.getInitDir();
    file_.ensureDirPath(destDir);

    tableInitFileGenerator(params.table, destDir);

    return;
  }

  logNotice('no-op');
}
