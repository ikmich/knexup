import { Command } from 'commander';
import { TableInitFileGenerator } from '../../generator/table-init-file.generator.js';
import { table_ } from '../../utils/index.js';
import Path from 'path';
import { CliOptions } from '../../types.js';
import { CONFIG_FILENAME, PROJECT_ROOT } from '../../constants.js';
import { ConfigFileGenerator } from '../../generator/config-file.generator.js';
import { knexupUtil } from '../../utils/knexup-util.js';
import { file_ } from '../../utils/file-util.js';
import { logError } from '../../utils/log.util.js';
import { KnexupSetupGenerator } from '../../generator/knexup-gen/knexup-setup.generator.js';
import { KnexSetupGenerator } from '../../generator/knex-gen/knex-setup.generator.js';
import { GitignoreEditor } from '../../editor/gitignore.editor.js';

export async function initCommandHandler(command: Command) {
  const opts = command.opts<CliOptions>();
  const args = command.args;
  const arg0 = args[0]?.trim() || null;
  const arg1 = args[1]?.trim() || null;

  const params = {
    table: null as string | null
  };

  if (opts.table?.trim()) {
    params.table = opts.table?.trim();
  }

  ConfigFileGenerator(PROJECT_ROOT);

  const tableInitDirFragment = await knexupUtil.getKnexupDirFragment();
  await KnexupSetupGenerator({
    knexupDirPath: Path.join(PROJECT_ROOT, tableInitDirFragment),
    table: params.table || undefined
  });

  await KnexSetupGenerator({
    projectRoot: PROJECT_ROOT,
    projectName: knexupUtil.getTargetProjectName(),
    dbClient: opts.databaseClient ?? 'postgres'
  });

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

    // const destDir = await knexupUtil.getTableInitDirFragment();
    const destDir = await knexupUtil.getTableInitDirPath();
    // file_.ensureDirPath(Path.join(PROJECT_ROOT, destDir));
    file_.ensureDirPath(Path.join(destDir));

    TableInitFileGenerator(params.table, destDir);
  }

  // Update gitignore file (knexup-config.(c)js)
  GitignoreEditor({
    projectRoot: PROJECT_ROOT,
    newLines: [CONFIG_FILENAME]
  });
}
