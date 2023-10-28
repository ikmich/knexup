import { Knex } from 'knex';

export type TableRefs = {
  [tableName: string]: string;
};

export interface TableInit {
  create?: (kx: Knex) => Promise<void>;
  seed?: (kx: Knex) => Promise<void>;
}

export type MigrationInitMap = { [k: string]: TableInit };

export type KnexupConfig = {
  knexupDir?: string;
};

export type CliOptions = {
  table?: string;
  path?: string;
};

export type KnexupInitOpts = {
  knexConfig: Knex.Config;
  tableRefs: TableRefs;
  migrationMap: MigrationInitMap;
}