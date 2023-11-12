import { TableRefs } from '../types.js';
import { TableInitFileGenerator } from './table-init-file.generator.js';
import { knexupUtil } from '../utils/knexup-util.js';

export async function multiTableInitGenerator(tableRefs: TableRefs) {
  for (const tableName of Object.values(tableRefs)) {

    const destDir = await knexupUtil.getTableInitDirPath();
    TableInitFileGenerator(tableName, destDir);
  }
}