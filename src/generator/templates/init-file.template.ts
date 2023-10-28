import {
  TEMPLATE_PATTERN_MODEL_INTERFACE,
  TEMPLATE_PATTERN_TABLE_NAME_FOR_SYMBOL,
  TEMPLATE_PATTERN_TABLE_REF
} from '../../constants.js';

const _void = 'void';
export const initFileTemplate = `import { Knex } from 'knex';
import { TableInit } from 'knexup';
import { _t } from '../tables.js';

export interface I${TEMPLATE_PATTERN_MODEL_INTERFACE} {}

export const ${TEMPLATE_PATTERN_TABLE_NAME_FOR_SYMBOL}Init: TableInit = {
  async create(knex: Knex): Promise<${_void}> {
    await knex.schema.createTable(${TEMPLATE_PATTERN_TABLE_REF}, (b) => {
      // Example.
      b.increments('id').primary();
    });
  },
  async seed(kx: Knex): Promise<${_void}> {
    // Implement seeds if needed
  }
}
`;
