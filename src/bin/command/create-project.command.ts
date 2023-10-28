import { Command } from 'commander';
import { CliOptions } from '../../types.js';
import Path from 'path';
import { newProjectGenerator } from '../../generator/project-gen/new-project.generator.js';
import { file_ } from '../../utils/file-util.js';
import { DEFAULT_GENERATED_PROJECT_NAME } from '../../constants.js';
import chalk from 'chalk';
import { _fn } from '../../utils/index.js';

export async function processCreateProjectCommand(command: Command) {
  const opts = command.opts<CliOptions>();
  const args = command.args;
  const projectName = (args[1] || DEFAULT_GENERATED_PROJECT_NAME).trim();

  if (!projectName) {
    console.error(chalk.red('!ERROR! No project name'));
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
          return 'pg';

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

  await newProjectGenerator(projectRoot, projectName, dbClient?.trim());
}