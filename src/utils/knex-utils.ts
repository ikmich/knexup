import { Knex } from 'knex';
import { _fn } from './index.js';
import { TableRefs } from '../types.js';
import { DATETIME_PRECISION } from '../constants.js';
import CreateTableBuilder = Knex.CreateTableBuilder;

export const ext = {
  tableRefs: {} as TableRefs,
  knexConfig: {} as Knex.Config
};
export type TableRefType = keyof typeof ext.tableRefs;

export const dbUtils = {
  async foreignKeyChecks(knex: Knex, state: 'on' | 'off', connClient?: string) {
    const map = {
      on: 1,
      off: 0
    };

    if (connClient === 'mysql') {
      await knex.raw(`SET foreign_key_checks = ${map[state]}`);
    }
    // todo - do for other db types
  }
};

export const tableUtils = {
  async truncate(knex: Knex, table: string, connClient?: string) {
    if (connClient?.includes('sqlite')) {
      await knex.raw(`delete from ${table}`);
    } else {
      await knex.raw(`truncate ${table}`);
    }
  },
};

export const tableBuilderUtils = {
  /**
   * Create columns for created_at and updated_at
   * @param knex
   * @param b
   * @param usePrecision
   */
  timestampColumns(knex: Knex, b: CreateTableBuilder, usePrecision: boolean = true) {
    const options = _fn(() => {
      if (usePrecision) {
        return {
          precision: DATETIME_PRECISION
        };
      }
      return null;
    });

    b.datetime('created_at', options).defaultTo(knex.raw(columnUtils.defaultCurrentTimestamp('create')));
    b.datetime('updated_at', options).defaultTo(knex.raw(`${columnUtils.defaultCurrentTimestamp('update')}`));
  },

  /*
   * Create datetime column. */
  datetime(columnName: string, knex: Knex, b: CreateTableBuilder, usePrecision: boolean = true) {
    const opts = _fn(() => {
      if (usePrecision) {
        return { precision: DATETIME_PRECISION };
      }
      return {};
    });
    b.datetime(columnName, opts);
  }
}

export const columnUtils = {
  defaultCurrentTimestamp(type: 'create' | 'update', usePrecision: boolean = false, connClient?: string): string {
    if (connClient) {
      // Sqlite does not support precision in time stamp
      if (String(connClient).includes('sqlite')) {
        return `CURRENT_TIMESTAMP`;
      }
    }

    const stamp = _fn(() => {
      if (usePrecision) {
        return `CURRENT_TIMESTAMP(${DATETIME_PRECISION})` as const;
      }
      return 'CURRENT_TIMESTAMP' as const;
    });

    return type == 'create' ? stamp : `${stamp} ON UPDATE ${stamp}`;
  }
};

const mysqlUtils = {};

const postgresUtils = {};
