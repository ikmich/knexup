import { configUtil } from './config-util.js';
import { PROJECT_ROOT, SCHEMA_DIR_FRAGMENT, TABLE_INIT_DEST_DIR_FRAGMENT } from '../constants.js';
import { path_ } from './index.js';
import { createRequire } from 'module';
import Path from 'path';

const require = createRequire(import.meta.url);

export const knexupUtil = {
  async getKnexupDirFragment(): Promise<string> {
    const config = await configUtil.readConfig();
    if (config?.knexupDir) {
      return path_.removeLeadingSlash(config.knexupDir);
    }
    return SCHEMA_DIR_FRAGMENT;
  },

  async getTableInitDirPath(): Promise<string> {
    return Path.join(PROJECT_ROOT, TABLE_INIT_DEST_DIR_FRAGMENT);
  },

  getTargetProjectName(): string {
    const pkgJsonFile = Path.join(PROJECT_ROOT, 'package.json');
    const config = require(pkgJsonFile);
    if (config) {
      return config['name'];
    }
    return '';
  }
};