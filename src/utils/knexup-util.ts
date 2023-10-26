import { configUtil } from './config-util.js';
import { KNEXUP_DIR } from '../constants.js';

export const knexupUtil = {
  async getKnexupDir(): Promise<string> {
    const config = await configUtil.readConfig();
    if (config) {
      return config.knexupDir;
    }
    return KNEXUP_DIR;
  }
};