export type TableRefs = {
  [tableName: string]: string;
};

export type KnexupConfig = {
  /**
   * The knex folder path relative to the project root.
   */
  knexDir?: string;
};

export type CliOptions = {
  table?: string | string[];
  path?: string;
  databaseClient?: string;
};
