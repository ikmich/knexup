#!/usr/bin/env node

import { Command } from 'commander';
import { processInitCommand2 } from './command/init.command.js';
import { processCreateProjectCommand } from './command/create-project.command.js';

export const COMMAND_INIT = 'init';
export const COMMAND_PROJECT = 'project';

const program = new Command();

program
  .description('knexup.js cli')
  .option('-p, --path <char>', 'Path relative to project root.')
  .option('-t, --table <char>', 'Database table name.')
;

program
  .command(COMMAND_INIT, { isDefault: true })
  .description('Create knexup config file for the project and generate init file for table entity')
  .action(async () => {
    await processInitCommand2(program);
  });

program
  .command(COMMAND_PROJECT)
  .description('Generate a knex.js project')
  .action(async () => {
    // console.log('-> project')
    await processCreateProjectCommand(program);
  });


// program
//   .command(COMMAND_BOOTSTRAP)
//   .description('Bootstrap knexup for the project. Generates knexup config and init files.')
//   .action(async () => {
//     await processBootstrapCommand(program);
//   });


program.parse();

// ---------------------------------------------------------------------------------------------------------------------
