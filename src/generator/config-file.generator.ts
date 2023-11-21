import Path from 'path';
import fs from 'fs-extra';
import { CONFIG_FILENAME, KNEX_DIR_FRAGMENT_DEFAULT } from '../constants.js';
import { logInfo } from '../utils/log.util.js';

/**
 * Generates the knexup config file in the project root.
 */
export function ConfigFileGenerator(destDir: string) {
  const contents = `module.exports = {
  /**
   * The knex folder path relative to the project root.
   */
  knexDir: '${KNEX_DIR_FRAGMENT_DEFAULT}'
}`;

  const configFile = Path.join(destDir, CONFIG_FILENAME);
  if (!fs.existsSync(configFile)) {
    fs.writeFileSync(configFile, contents);
    logInfo(`${CONFIG_FILENAME} created in ${destDir}.`);
  }
}
