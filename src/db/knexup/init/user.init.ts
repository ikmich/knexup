import { Knex } from 'knex';
// @ts-ignore
import { TableInit } from 'knexup';
import { _t } from '../table-refs.js';

export interface IUser {}

export const userInit: TableInit = {
  async create(knex: Knex): Promise<void> {
    await knex.schema.createTable(_t.user, (b) => {
      // Example.
      b.increments('id').primary();
    });
  },
  async seed(kx: Knex): Promise<void> {
    // Implement seeds if needed
  }
}
