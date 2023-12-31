import { file_ } from '../../utils/file-util.js';

export type KnexfileGeneratorOpts = {
  knexfilePath: string;
  projectName: string;
  projectRoot: string;
  dbClient: string;
}

export function KnexfileGenerator(opts: KnexfileGeneratorOpts) {
  const { knexfilePath, projectName, projectRoot, dbClient } = opts;

  if (file_.exists(knexfilePath)) {
    // logNotice(`${knexfilePath} already exists.`);
    return;
  }

  const contents = `import Path from 'path';
import { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';
import StaticConnectionConfig = Knex.StaticConnectionConfig;

const dbConnection: StaticConnectionConfig = {
  host: 'db-host',
  port: 1234,
  database: 'db-name',
  user: 'connection-user',
  password: 'connection-password',
  // /* this works for mysql driver */
  // timezone: 'utc',
  /* this works for mysql2 driver */
  timezone: '+00:00'
};

const defaultConfig: Knex.Config = {
  client: '${dbClient}',
  connection: dbConnection,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: './migrations',
    tableName: '${projectName}-migrations',
    extension: 'ts'
  },
  seeds: {
    directory: './seeds'
  },

  // //Used to discover schemas where tables are located. Useful for schema-based db's like postgres.
  // searchPath: [''],

  // Converts camelCase inputs to snake_case and also converts
  // snake_case values from database to camelCase for code
  // read https://vincit.github.io/objection.js/recipes/snake-case-to-camel-case-conversion.html
  ...knexSnakeCaseMappers()
};

const knexEnvironmentConfig: any = {
  development: { 
  ...defaultConfig,
  // debug: true,
},

  staging: { ...defaultConfig },
  production: { ...defaultConfig },

  test: {
    ...defaultConfig,
    client: 'sqlite3',
    connection: {
      filename: Path.join('.', 'test-db.sqlite')
    },
    useNullAsDefault: true,
    // debug: true,
  }
};

export default knexEnvironmentConfig;
`;

  file_.writeFile(knexfilePath, contents);
}