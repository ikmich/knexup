import { TableRefs } from '../types.js';
import { singleTableInitFileGenerator } from './single-table-init-file.generator.js';
import { _fn } from '../utils/index.js';
import { KNEXUP_INIT_DIR } from '../constants.js';
import { configUtil } from '../utils/config-util.js';

export async function multiTableInitGenerator(tableRefs: TableRefs) {
  for (const tableName of Object.values(tableRefs)) {
    const config = await configUtil.readConfig();
    const path = _fn(() => {
      if (config) {
        return config.knexupDir;
      }
      return `${KNEXUP_INIT_DIR}/init`;
    });

    singleTableInitFileGenerator(tableName, path);
  }
}