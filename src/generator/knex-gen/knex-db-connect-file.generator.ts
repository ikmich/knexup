import { file_ } from '../../utils/file-util.js';
import { logNotice } from '../../utils/log.util.js';

export function KnexDbConnectFileGenerator(filePath: string) {
  if (file_.exists(filePath)) {
    // logNotice(`[db.knex file] ${filePath} already exists.`);
    return;
  }

  const content = `import knexEnvironmentConfig from './knexfile.js';
import { Model } from 'objection';
import { Knex } from 'knex';
import knex from 'knex';

export const knexConfig: Knex.Config = knexEnvironmentConfig[process.env.NODE_ENV || 'local'];

/**
 * Knex instance for database operations. See https://knexjs.org/guide/.
 */
export const db = knex.knex(knexConfig);

export function connectDb(databaseName: string) {
  const config: typeof knexConfig = Object.assign({}, knexConfig, {});
  config['connection']['database'] = databaseName;
  return knex(config);
}

/* Configure Objection.js Model. Uncomment if using Objection.js */
// Model.knex(db);
`;

  file_.writeFile(filePath, content);

  logNotice(`${filePath} created.`);
}