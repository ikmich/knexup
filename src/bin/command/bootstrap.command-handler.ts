import { Command } from 'commander';
import { file_ } from '../../utils/file-util.js';
import { CONFIG_FILE, PROJECT_ROOT_DEFAULT } from '../../constants.js';
import { logWarn } from '../../utils/log.util.js';
import { KnexSetupGenerator } from '../../generator/knex-gen/knex-setup.generator.js';
import { knexupUtil } from '../../utils/knexup-util.js';
import { CliOptions } from '../../types.js';

export async function bootstrapCommandHandler(command: Command) {
  if (!file_.exists(CONFIG_FILE)) {
    logWarn(`${CONFIG_FILE} does not exist. Run \`knexup init\` to generate the config file.`);
    return;
  }

  const opts = command.opts<CliOptions>();

  await KnexSetupGenerator({
    projectRoot: PROJECT_ROOT_DEFAULT,
    projectName: knexupUtil.getTargetProjectName(PROJECT_ROOT_DEFAULT),
    dbClient: opts.databaseClient ?? 'postgres'
  });
}
