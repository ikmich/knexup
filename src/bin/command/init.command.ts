import { Command } from 'commander';
import { singleTableInitFileGenerator } from '../../generator/single-table-init-file.generator.js';
import { _fn, _isValidTable, _undefined } from '../../utils/index.js';
import Path from 'path';
import fs from 'fs-extra';
import { CliOptions } from '../../types.js';
import { CONFIG_FILENAME, KNEXUP_INIT_DIR, PROJECT_ROOT } from '../../constants.js';
import { configUtil } from '../../utils/config-util.js';

export async function processInitCommand(command: Command) {
  const opts = command.opts<CliOptions>();

  let _table = '';

  const args = command.args;

  const [arg0, arg1] = args;

  if (arg0 !== 'init') {
    /* => The 'init' command was not explicitly typed. We thus set the table implicitly as the value of the first
    argument. */
    _table = arg0;
  } else if (arg1) {
    /* => The 'init' command was explicitly typed as well as a 2nd argument. That second argument is now implicitly
    the value of "table". */
    _table = arg1;
  }

  /* If table was set as an option flag, that overrides all the other arguments. */
  if (opts.table) {
    _table = opts.table;
  }

  console.log({
    opts,
    args,
    _table
  });

  if (!_table) {
    console.error('! Missing table option');
    return;
  }

  /* Strip invalid characters from table name. */
  if (!_isValidTable(_table)) {
    throw '! Invalid table name';
  }

  const pathValue = await _fn(async () => {
    if (opts.path && opts.path.trim()) {
      return opts.path;
    }

    // read config file
    let configFile = Path.join(PROJECT_ROOT, CONFIG_FILENAME);
    if (fs.existsSync(configFile)) {

      // const config = require(configFile) as KnexupConfig;
      const config = await configUtil.readConfig();
      if (_undefined(config?.knexupDir)) {
        return config?.knexupDir.replace(/^\//, '');
      }
    }

    return KNEXUP_INIT_DIR;
  });

  singleTableInitFileGenerator(_table, pathValue);
}
