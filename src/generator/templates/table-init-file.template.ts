import {
  TABLE_REFS_FILENAME,
  TEMPLATE_PATTERN_MODEL_INTERFACE,
  TEMPLATE_PATTERN_TABLE_NAME_FOR_SYMBOL,
  TEMPLATE_PATTERN_TABLE_REF
} from '../../constants.js';

const _void = 'void';
const tableRefsFileLabel = TABLE_REFS_FILENAME.replace(/\.ts$/, '');

export const tableInitFileTemplate = `import { Knex } from 'knex';
import { TableInit } from 'knexhelpers';
import { tbl } from '../${tableRefsFileLabel}.js';

export interface ${TEMPLATE_PATTERN_MODEL_INTERFACE}Record {}

export const ${TEMPLATE_PATTERN_TABLE_NAME_FOR_SYMBOL}Init: TableInit = {
  async create(knex: Knex): Promise<${_void}> {
    await knex.schema.createTable(${TEMPLATE_PATTERN_TABLE_REF}, (b) => {
      // Example.
      b.increments('id').primary();
    });
  },
  async seed(knex: Knex): Promise<${_void}> {
    // Implement seeds if needed
  }
}
`;
