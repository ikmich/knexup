import { Command } from 'commander';
import { CliOptions } from '../../types.js';
import Path from 'path';
import { NewProjectGenerator } from '../../generator/project-gen/new-project.generator.js';
import { file_ } from '../../utils/file-util.js';
import { GENERATED_PROJECT_NAME_DEFAULT } from '../../constants.js';
import { _fn } from '../../utils/index.js';
import { logError } from '../../utils/log.util.js';

export async function createProjectCommandHandler(command: Command) {
  const opts = command.opts<CliOptions>();
  const args = command.args;
  const projectName = (args[1] || GENERATED_PROJECT_NAME_DEFAULT).trim();

  if (!projectName) {
    logError('!ERROR! No project name');
    return;
  }

  const dbClient = _fn(() => {
    if (opts.databaseClient) {
      switch (opts.databaseClient) {
        case 'mysql':
        case 'mysql2':
        case 'mariadb':
          return 'mysql2';

        case 'pg':
        case 'postgres':
        case 'postgresql':
          return 'postgres';

        case 'sqlite':
        case 'sqlite3':
        case 'better-sqlite':
          return 'better-sqlite';
      }
    }

    return 'sqlite3';
  });

  const destPath = (opts.path?.trim() ? Path.resolve(opts.path?.trim()) : null) || Path.resolve('.');
  const projectRoot = Path.join(destPath, projectName);

  // console.log('[processProjectGenCommand]', {
  //   args,
  //   opts,
  //   projectName,
  //   projectRoot
  // });

  file_.ensureDirPath(projectRoot);

  await NewProjectGenerator(projectRoot, projectName, dbClient?.trim());
}