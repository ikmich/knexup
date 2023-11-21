#!/usr/bin/env node

import { Command } from 'commander';
import { initCommandHandler } from './command/init.command-handler.js';
import { createProjectCommandHandler } from './command/create-project.command-handler.js';
import { bootstrapCommandHandler } from './command/bootstrap.command-handler.js';
import { tableInitCommandHandler } from './command/table-init.command-handler.js';

export const CMD_INIT = 'init';
export const CMD_PROJECT = 'project';
export const CMD_BOOTSTRAP = 'bootstrap';
export const CMD_TABLE_INIT = 'table-init';

const program = new Command();

program
  .description('knexup.js cli')
  .option('-p, --path <char>', 'Path relative to project root.')
  .option('-t, --table [tables...]', 'Database table name(s).')
  .option('-d, --database-client <char>', 'The preferred database client (mysql|postgres|sqlite)');

program
  .command(CMD_INIT)
  .description('Initialize a project for Knex development. Generates TableInit migration helper object for table "create" migration. Also creates a knexup config file if it does not exist.')
  .action(async () => {
    await initCommandHandler(program);
  });

program
  .command(CMD_PROJECT)
  .description('Generate a project based on knex.js')
  .argument('projectName', 'Name of the project. Use with the "project" command.')
  .action(async () => {
    await createProjectCommandHandler(program);
  });

program
  .command(CMD_BOOTSTRAP)
  .description('Generates files and installs dependencies for working with knex.js.')
  .action(async () => {
    await bootstrapCommandHandler(program);
  });

program
  .command(CMD_TABLE_INIT, { isDefault: true })
  .description('Generates table-init schema-creation helpers for each table specified via --table')
  .action(async () => {
    await tableInitCommandHandler(program);
  });

program.parse();

// ---------------------------------------------------------------------------------------------------------------------
