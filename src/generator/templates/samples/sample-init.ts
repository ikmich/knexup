import { TableInit } from '../../../types.js';
import { Knex } from 'knex';

export interface IUser {
  // Add property type definitions here.
}

export const userInit: TableInit = {
  async create(knex: Knex): Promise<void> {
    await knex.schema.createTable('user', (b) => {
      // Example.
      b.increments('id').primary();
      b.string('name').unique().notNullable();
      b.string('description');
    });
  },
  async seed(kx: Knex): Promise<void> {
    // Implement seeds if needed
  }
};
