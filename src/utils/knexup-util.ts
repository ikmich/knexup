import { configUtil } from './config-util.js';
import {
  KNEX_DIR_FRAGMENT_DEFAULT,
  SCHEMA_DIR_FRAGMENT_DEFAULT,
  SCHEMA_DIR_NAME_DEFAULT,
  TABLE_INIT_DIR_NAME
} from '../constants.js';
import { path_ } from './index.js';
import Path from 'path';
import fs from 'fs-extra';
import { logWarn } from './log.util.js';

export const knexupUtil = {
  async getSchemaDirSegment(): Promise<string> {
    const config = await configUtil.readConfig();
    if (config?.knexDir) {
      const knexDirSegment = path_.removeLeadingSlash(config.knexDir);
      return `${knexDirSegment}/${SCHEMA_DIR_NAME_DEFAULT}`;
    }
    return SCHEMA_DIR_FRAGMENT_DEFAULT;
  },

  async getKnexDirSegment() {
    const config = await configUtil.readConfig();
    let dirSegment = '';
    if (config?.knexDir) {
      dirSegment = config?.knexDir;
    } else {
      dirSegment = KNEX_DIR_FRAGMENT_DEFAULT;
    }
    return dirSegment;
  },

  async getTableInitDirPath(projectRoot: string): Promise<string> {
    const knexDirStub = await this.getSchemaDirSegment();
    return Path.join(projectRoot, knexDirStub, TABLE_INIT_DIR_NAME);
  },

  getTargetProjectName(projectRoot: string): string {
    const pkgJsonFile = Path.join(projectRoot, 'package.json');
    if (!fs.existsSync(pkgJsonFile)) {
      return '';
    }
    const config = fs.readJsonSync(pkgJsonFile);
    if (config) {
      return config['name'];
    }
    return '';
  }
};