import Path from 'path';
import fs from 'fs-extra';
import { CONFIG_FILENAME, KNEXUP_DIR } from '../constants.js';
import { logInfo } from '../utils/log.util.js';

/**
 * Generates the knexup config file in the project root.
 */
export function configFileGenerator(destDir: string) {
  const contents = `module.exports = {
  knexupDir: '${KNEXUP_DIR}'
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
