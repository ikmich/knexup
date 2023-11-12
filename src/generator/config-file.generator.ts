import Path from 'path';
import fs from 'fs-extra';
import { CONFIG_FILENAME, SCHEMA_DIR_FRAGMENT } from '../constants.js';
import { logInfo } from '../utils/log.util.js';

/**
 * Generates the knexup config file in the project root.
 */
export function ConfigFileGenerator(destDir: string) {
  const contents = `module.exports = {
  knexupDir: '${SCHEMA_DIR_FRAGMENT}'
}`;

  const configFile = Path.join(destDir, CONFIG_FILENAME);
  if (!fs.existsSync(configFile)) {
    fs.writeFileSync(configFile, contents);
    // console.log(chalk.blueBright(`${CONFIG_FILENAME} created in this location.`));
    logInfo(`${CONFIG_FILENAME} created in this location.`)
  } else {
    // knexup config file already exists.
  }
}
