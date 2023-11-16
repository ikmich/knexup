export type TableRefs = {
  [tableName: string]: string;
};

export type KnexupConfig = {
  /**
   * The knex folder path relative to the project root.
   */
  knexDirFragment?: string;
};

export type CliOptions = {
  table?: string;
  path?: string;
  databaseClient?: string;
};
