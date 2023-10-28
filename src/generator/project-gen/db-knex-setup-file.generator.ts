import { file_ } from '../../utils/file-util.js';
import chalk from 'chalk';

export function dbKnexSetupFileGenerator(filePath: string) {
  if (file_.exists(filePath)) {
    console.log(
      chalk.yellow(`(db.knex setup file) ${filePath} already exists.`)
    );
    return;
  }

  const content = `import knexEnvironmentConfig from './knexfile.js';
import { Model } from 'objection';
import { Knex } from 'knex';
import knex from 'knex';

const env = process.env.NODE_ENV || 'local';
export const knexConfig: Knex.Config = knexEnvironmentConfig[env];

/**
 * Knex instance for database operations. See https://knexjs.org/guide/.
 */
export const db = knex.knex(knexConfig);

/* Configure Objection.js Model. Uncomment if using Objection.js */
// Model.knex(db);
`;

  file_.writeFile(filePath, content);

  console.log(
    chalk.yellow(`${filePath} created.`)
  );

}