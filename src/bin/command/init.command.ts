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
import chalk from 'chalk';
import { knexupFileGenerator } from '../../generator/knexup-file.generator.js';

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

export async function processInitCommand2(command: Command) {
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

  console.log('[processInitCommand2]', {
    args,
    opts,
    state: params,
    arg0,
    arg1
  });

  if (params.table) {
    /* Validate table name. */
    if (!table_.isValidTable(params.table)) {
      console.error(chalk.red('!ERROR! Invalid table name'));
      return;
    }

    const destDir = await knexupUtil.getInitDir();
    file_.ensureDirPath(destDir);

    tableInitFileGenerator(params.table, destDir);

    return;
  }

  console.log(chalk.yellow('no-op'));
}

// export async function processInitCommand(command: Command) {
//   const opts = command.opts<CliOptions>();
//
//   let _table = '';
//
//   const args = command.args;
//
//   const [arg0, arg1] = args;
//
//   if (arg0 !== 'init') {
//     /* => The 'init' command was not explicitly typed. We thus set the table implicitly as the value of the first
//     argument. */
//     _table = arg0;
//   } else if (arg1) {
//     /* => The 'init' command was explicitly typed as well as a 2nd argument. That second argument is now implicitly
//     the value of "table". */
//     _table = arg1;
//   }
//
//   /* If table was set as an option flag, that overrides all the other arguments. */
//   if (opts.table) {
//     _table = opts.table;
//   }
//
//   console.log('[processInitCommand]', {
//     opts,
//     args,
//     _table
//   });
//
//   if (!_table) {
//     console.error('! Missing table option');
//     return;
//   }
//
//   /* Strip invalid characters from table name. */
//   if (!table_.isValidTable(_table)) {
//     throw '! Invalid table name';
//   }
//
//   const pathValue = await _fn(async () => {
//     if (opts.path && opts.path.trim()) {
//       return opts.path;
//     }
//
//     // read config file
//     let configFile = Path.join(PROJECT_ROOT, CONFIG_FILENAME);
//     if (fs.existsSync(configFile)) {
//
//       // const config = require(configFile) as KnexupConfig;
//       const config = await configUtil.readConfig();
//       if (_undefined(config?.knexupDir)) {
//         return config?.knexupDir?.replace(/^\//, '');
//       }
//     }
//
//     return KNEXUP_INIT_DIR;
//   });
//
//   tableInitFileGenerator(_table, pathValue);
// }
