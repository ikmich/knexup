#!/usr/bin/env node

import { Command } from 'commander';
import { initCommandHandler } from './command/init.command-handler.js';
import { createProjectCommandHandler } from './command/create-project.command-handler.js';

export const COMMAND_INIT = 'init';
export const COMMAND_PROJECT = 'project';
export const COMMAND_KNEX_INIT = 'knex-init';

const program = new Command();

program
  .description('knexup.js cli')
  .option('-p, --path <char>', 'Path relative to project root.')
  .option('-t, --table <char>', 'Database table name.')
  .option('-d, --database-client <char>', 'The preferred database client (mysql|postgres|sqlite)');

program
  .command(COMMAND_INIT, { isDefault: true })
  .description('Generate init file for table entity. This also creates a knexup config file if it does not exist.')
  .action(async () => {
    await initCommandHandler(program);
  });

program
  .command(COMMAND_PROJECT)
  .description('Generate a project based on knex.js')
  .action(async () => {
    await createProjectCommandHandler(program);
  });

// program
//   .command(COMMAND_KNEX_INIT)
//   .description('Create knex config, migrations, seeds, and npm scripts for knex.js in a project')
//   .action(async () => {
//     console.log('cmd: knex init');
//   });

program.parse();

// ---------------------------------------------------------------------------------------------------------------------
