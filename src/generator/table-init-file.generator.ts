import { initFileTemplate } from './templates/init-file.template.js';
import pluralize from 'pluralize';
import { _upperFirst } from '../utils/index.js';
import {
  TEMPLATE_PATTERN_MODEL_INTERFACE,
  TEMPLATE_PATTERN_TABLE_NAME,
  TEMPLATE_PATTERN_TABLE_NAME_FOR_SYMBOL, TEMPLATE_PATTERN_TABLE_REF
} from '../constants.js';
import * as ChangeCase from 'change-case';
import { file_ } from '../utils/file-util.js';
import chalk from 'chalk';

/**
 * Generate init file for a single table entity.
 * @param tableName
 * @param destDir
 */
export function tableInitFileGenerator(tableName: string, destDir: string) {

  if (!file_.exists(destDir)) {
    console.error(chalk.red(`!ERROR! destDir path not found - ${destDir}`));
    return;
  }

  const interfaceName = _upperFirst(ChangeCase.camelCase(pluralize(tableName, 1)));

  const regexes = {
    tableNameSymbol: new RegExp(TEMPLATE_PATTERN_TABLE_NAME_FOR_SYMBOL, 'g'),
    tableNameValue: new RegExp(TEMPLATE_PATTERN_TABLE_NAME, 'g'),
    tableRef: new RegExp(TEMPLATE_PATTERN_TABLE_REF, 'g'),
    modelInterface: new RegExp(TEMPLATE_PATTERN_MODEL_INTERFACE, 'g')
  };

  const camelCasedTableName = ChangeCase.camelCase(tableName);
  const output = initFileTemplate
    .replace(regexes.tableNameSymbol, camelCasedTableName)
    .replace(regexes.modelInterface, interfaceName)
    .replace(regexes.tableRef, `_t.${camelCasedTableName}`);

  // write to file
  file_.ensureDirPath(destDir);

  const initFile = file_.joinPaths(destDir, `${tableName}.init.ts`);

  if (file_.exists(initFile)) {
    console.warn('init file already exists');
    return;
  }

  file_.writeFile(initFile, output);
}
