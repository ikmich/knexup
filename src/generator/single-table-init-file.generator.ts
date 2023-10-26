import { initFileTemplate } from './templates/init-file.template.js';
import pluralize from 'pluralize';
import { _removeLeadingSlash, _upperFirst } from '../utils/index.js';
import { PROJECT_ROOT, TEMPLATE_PATTERN_MODEL_INTERFACE, TEMPLATE_PATTERN_TABLE_NAME } from '../constants.js';
import * as ChangeCase from 'change-case';
import { file_ } from '../utils/file-util.js';

/**
 * Generate init file for a single table entity.
 * @param tableName
 * @param relativePath
 */
export function singleTableInitFileGenerator(tableName: string, relativePath: string) {

  const _relativePath = _removeLeadingSlash(relativePath);
  const interfaceName = _upperFirst(ChangeCase.camelCase(pluralize(tableName, 1)));

  const regexes = {
    tableName: new RegExp(TEMPLATE_PATTERN_TABLE_NAME, 'g'),
    modelInterface: new RegExp(TEMPLATE_PATTERN_MODEL_INTERFACE, 'g')
  };

  const camelCasedTableName = ChangeCase.camelCase(tableName);
  const output = initFileTemplate.replace(regexes.tableName, camelCasedTableName).replace(regexes.modelInterface, interfaceName);

  // write to file
  const fullDirPath = file_.joinPaths(PROJECT_ROOT, _relativePath);
  file_.ensureDirPath(fullDirPath);

  const initFile = file_.joinPaths(fullDirPath, `${tableName}.init.ts`);

  if (file_.exists(initFile)) {
    console.warn('init file already exists');
    return;
  }

  file_.writeFile(initFile, output);
}
