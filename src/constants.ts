export const CONFIG_FILENAME = 'knexup-config.cjs';
export const KNEX_DIR_NAME = '_knex';
export const KNEX_DIR_FRAGMENT = `src/${KNEX_DIR_NAME}`;
// export const KNEXUP_DIR_NAME = 'table-init';
export const SCHEMA_DIR_NAME = 'schema';
export const SCHEMA_DIR_FRAGMENT = `src/${KNEX_DIR_NAME}/${SCHEMA_DIR_NAME}`;
export const TABLE_INIT_DEST_DIR_NAME = 'table-init';
export const TABLE_INIT_DEST_DIR_FRAGMENT = `${SCHEMA_DIR_FRAGMENT}/${TABLE_INIT_DEST_DIR_NAME}`;
// export const KNEXUP_INIT_DIR = `${KNEXUP_DIR_PATH_FRAGMENT}/${KNEXUP_INIT_DIR_NAME}`;
// export const INIT_DIR_NAME = KNEXUP_INIT_DIR_NAME;
export const TEMPLATE_PATTERN_TABLE_NAME_FOR_SYMBOL = '%tableNameForSymbol%';
export const TEMPLATE_PATTERN_TABLE_NAME = '%tableName%';
export const TEMPLATE_PATTERN_TABLE_REF = '%tableRef%';
export const TEMPLATE_PATTERN_MODEL_INTERFACE = '%modelInterface%';
export const PROJECT_ROOT = process.cwd();
export const TABLE_REFS_FILENAME = 'table-refs.ts';
// export const conf = new Conf({ projectName: 'knexup' });
export const DEFAULT_GENERATED_PROJECT_NAME = 'my-knex-project';

export const GIT_IGNORE_CONTENTS = `node_modules/
dist/
.idea/
.vscode/
.DS_Store
.env
`;

export const PRETTIERRC_CONTENTS = `module.exports = {
  semi: true,
  trailingComma: 'none',
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2
};
`;