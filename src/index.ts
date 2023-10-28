import { Knex } from 'knex';
import { columnUtils, dbUtils, ext, tableBuilderUtils, tableUtils } from './utils/knex-utils.js';
import { MigrationInitMap, TableInit, TableRefs } from './types.js';
import { multiTableInitGenerator } from './generator/multi-table-init.generator.js';

export const knexUtil = {
  uuid(knex: Knex) {
    return knex.raw('(uuid())');
  },
  db: dbUtils,
  table: tableUtils,
  tableBuilder: tableBuilderUtils,
  column: columnUtils
};
export const knexutil = knexUtil;
/**
 *
 */
export const knexup = {
  // registerKnexConfig: (knexConfig: Knex.Config) => {
  //   ext.knexConfig = knexConfig;
  // },

  registerTableRefs: (tableRefs: TableRefs) => {
    ext.tableRefs = tableRefs;
  },

  /**
   * Generate init files for each table in tableRefs.
   * @param tableRefs
   */
  init: async (tableRefs: TableRefs) => {
    await multiTableInitGenerator(tableRefs);
  },

  /**
   * To be run inside the 'up()' function of the knex migration file.
   * @param knex
   * @param migrationMap
   */
  runMigrationInit: async (knex: Knex, migrationMap: MigrationInitMap) => {
    const t0 = performance.now();

    let keys = Object.keys(migrationMap);
    for (let key of keys) {
      const init = migrationMap[key];
      await init.create?.(knex);
      await init.seed?.(knex);
    }

    const t1 = performance.now();
    const tDiff = t1 - t0;
    console.log(`Migration completed in: ${(tDiff / 1000).toFixed(2)} seconds`);
    console.log('');
  },

  run: async () => {

  }
};

export {
  TableRefs,
  TableInit
};