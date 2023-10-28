export const DATETIME_PRECISION = 4;
export const CONFIG_FILENAME = 'knexup-config.js';
export const KNEXUP_DIR = 'src/db/knexup';
export const KNEXUP_INIT_DIR = `${KNEXUP_DIR}/init`;
export const INIT_DIR_NAME = 'init';
export const TEMPLATE_PATTERN_TABLE_NAME_FOR_SYMBOL = '%tableNameForSymbol%';
export const TEMPLATE_PATTERN_TABLE_NAME = '%tableName%';
export const TEMPLATE_PATTERN_TABLE_REF = '%tableRef%';
export const TEMPLATE_PATTERN_MODEL_INTERFACE = '%modelInterface%';
export const PROJECT_ROOT = process.cwd();
export const KNEXUP_FILENAME = '__knexup.ts';
export const TABLE_REFS_FILENAME = 'tables.ts';
export const TABLE_REF_JSON_FILENAME = 'table-refs.json';
// export const conf = new Conf({ projectName: 'knexup' });

export const GIT_IGNORE_CONTENTS = `node_modules/
dist/
.idea/
.vscode/
.DS_Store/
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