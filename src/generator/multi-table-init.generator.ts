import { TableRefs } from '../types.js';
import { tableInitFileGenerator } from './table-init-file.generator.js';
import { configUtil } from '../utils/config-util.js';
import { knexupUtil } from '../utils/knexup-util.js';

export async function multiTableInitGenerator(tableRefs: TableRefs) {
  for (const tableName of Object.values(tableRefs)) {
    const config = await configUtil.readConfig();
    // const path = _fn(() => {
    //   if (config?.knexupDir) {
    //     return path_.removeLeadingSlash(config.knexupDir);
    //   }
    //   return `${KNEXUP_INIT_DIR}/init`;
    // });

    const destDir = await knexupUtil.getInitDir();
    tableInitFileGenerator(tableName, destDir);
  }
}