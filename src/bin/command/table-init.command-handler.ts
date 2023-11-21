import { Command } from 'commander';
import { CONFIG_FILE, PROJECT_ROOT_DEFAULT } from '../../constants.js';
import { CliOptions } from '../../types.js';
import { logWarn } from '../../utils/log.util.js';
import { file_ } from '../../utils/file-util.js';
import { TableInitSetupGenerator } from '../../generator/table-init/table-init-setup.generator.js';

/**
 * Initialize knex for project
 * @param command
 */
export async function tableInitCommandHandler(command: Command) {
  if (!file_.exists(CONFIG_FILE)) {
    logWarn(`${CONFIG_FILE} does not exist. Run \`knexup init\` to generate the config file.`);
    return;
  }

  const opts = command.opts<CliOptions>();
  const args = command.args;
  const MAIN_COMMAND_ARG = args.shift();

  let tableList1: string[] = [];
  let tableList2: string[] = [];

  if (!!MAIN_COMMAND_ARG && MAIN_COMMAND_ARG == 'table-init') {
    tableList1 = Array.from(args);
  }

  if (!!opts.table) {
    if (typeof opts.table == 'string') {
      tableList2.push(opts.table);
    } else if (Array.isArray(opts.table)) {
      tableList2 = opts.table;
    }
  }

  let resolvedTables: string[] = tableList1.concat(tableList2);

  await TableInitSetupGenerator({
    tables: resolvedTables,
    projectRoot: PROJECT_ROOT_DEFAULT
  });
}