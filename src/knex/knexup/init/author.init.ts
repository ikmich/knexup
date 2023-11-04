import { Knex } from 'knex';
// @ts-ignore
import { TableInit } from 'knexup';
import { _t } from '../__table-refs.js';

export interface IAuthor {}

export const authorInit: TableInit = {
  async create(knex: Knex): Promise<void> {
    await knex.schema.createTable(_t.author, (b) => {
      // Example.
      b.increments('id').primary();
    });
  },
  async seed(kx: Knex): Promise<void> {
    // Implement seeds if needed
  }
}
