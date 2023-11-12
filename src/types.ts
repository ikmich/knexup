export type TableRefs = {
  [tableName: string]: string;
};

export type KnexupConfig = {
  knexupDir?: string;
};

export type CliOptions = {
  table?: string;
  path?: string;
  databaseClient?: string;
};
