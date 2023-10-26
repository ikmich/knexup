#!/usr/bin/env node

import { Command } from 'commander';
import { processInitCommand } from './command/init.command.js';
import { processBootstrapCommand } from './command/bootstrap.command.js';
import { processCreateProjectCommand } from './command/create-project.command.js';

const COMMAND_INIT = 'init';
const COMMAND_BOOTSTRAP = 'bootstrap';
const COMMAND_PROJECT = 'create-project';

const program = new Command();

program
  .description('knexup.js cli')
  .option('-p, --path <char>', 'Path relative to project root.')
  .option('-t, --table <char>', 'Database table name.')
;

program
  .command(COMMAND_INIT, { isDefault: true })
  .description('Generate knexup init descriptor file for table model/entity')
  .action(async () => {
    await processInitCommand(program);
  });

program
  .command(COMMAND_BOOTSTRAP)
  .description('Bootstrap knexup for the project. Generates knexup config and init files.')
  .action(async () => {
    await processBootstrapCommand(program);
  });

program
  .command(COMMAND_PROJECT)
  .description('Generate a knex.js project')
  .action(async () => {
    await processCreateProjectCommand(program);
  });

program.parse();

// ---------------------------------------------------------------------------------------------------------------------
