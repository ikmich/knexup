import Path from 'path';
import fs from 'fs-extra';
import { CONFIG_FILENAME, KNEXUP_DIR } from '../constants.js';
import chalk from 'chalk';

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
  } else {
    console.log(chalk.yellow('knexup config file already exists'));
  }
}
