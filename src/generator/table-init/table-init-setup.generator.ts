import { TableInitFileGenerator } from './table-init-file.generator.js';
import { knexupUtil } from '../../utils/knexup-util.js';
import { tableUtil } from '../../utils/index.js';
import { logError } from '../../utils/log.util.js';
import { TableRefsFileGenerator } from './table-refs-file.generator.js';
import { PROJECT_ROOT_DEFAULT } from '../../constants.js';
import { file_ } from '../../utils/file-util.js';
import Path from 'path';

export type TableInitGeneratorOpts = {
  tables: string[];
  projectRoot: string;
}

export async function TableInitSetupGenerator(opts: TableInitGeneratorOpts) {
  const { tables, projectRoot } = opts;

  const knexDirSegment = await knexupUtil.getKnexDirSegment();
  const knexDirPath = Path.join(projectRoot, knexDirSegment);

  for (let table of tables) {
    /* Validate table name. */
    if (!tableUtil.isValidTable(table)) {
      logError(`!ERROR! Invalid table name "${table}"`);
      return;
    }

    /* generate table-ref file */
    await TableRefsFileGenerator(knexDirPath, table);

    /* generate table-init file */
    const tableInitDirPath = await knexupUtil.getTableInitDirPath(PROJECT_ROOT_DEFAULT);
    file_.ensureDirPath(Path.join(tableInitDirPath));

    TableInitFileGenerator(table, tableInitDirPath);
  }
}