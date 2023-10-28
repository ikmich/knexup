import { configUtil } from './config-util.js';
import { INIT_DIR_NAME, KNEXUP_DIR } from '../constants.js';
import { path_ } from './index.js';
import Path from 'path';

export const knexupUtil = {
  async getKnexupDir(): Promise<string> {
    const config = await configUtil.readConfig();
    if (config?.knexupDir) {
      return path_.removeLeadingSlash(config.knexupDir);
    }
    return KNEXUP_DIR;
  },

  async getInitDir(): Promise<string> {
    let knexupDir = await this.getKnexupDir();
    return `${knexupDir}/${INIT_DIR_NAME}`;
  }
};