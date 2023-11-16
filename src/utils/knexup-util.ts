import { configUtil } from './config-util.js';
import { PROJECT_ROOT, SCHEMA_DIR_FRAGMENT, SCHEMA_DIR_NAME, TABLE_INIT_DIR_NAME } from '../constants.js';
import { path_ } from './index.js';
import { createRequire } from 'module';
import Path from 'path';

const require = createRequire(import.meta.url);

export const knexupUtil = {
  async getKnexupDirStub(): Promise<string> {
    const config = await configUtil.readConfig();
    if (config?.knexDirFragment) {
      const knexDirPathStub = path_.removeLeadingSlash(config.knexDirFragment);
      return `${knexDirPathStub}/${SCHEMA_DIR_NAME}`;
    }
    return SCHEMA_DIR_FRAGMENT;
  },

  async getTableInitDirPath(): Promise<string> {
    const knexDirStub = await this.getKnexupDirStub();
    return Path.join(PROJECT_ROOT, knexDirStub, TABLE_INIT_DIR_NAME);
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