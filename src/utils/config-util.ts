import { KnexupConfig } from '../types.js';
import Path from 'path';
import { CONFIG_FILENAME, PROJECT_ROOT } from '../constants.js';
import { file_ } from './file-util.js';
import { temporaryDirectory } from 'tempy';

export const configUtil = {
  async readConfig(): Promise<KnexupConfig | null> {

    const configFile = Path.join(PROJECT_ROOT, CONFIG_FILENAME);
    if (!file_.exists(configFile)) {
      return null;
    }

    // copy to temp dir
    let tempDir = temporaryDirectory();
    let tempFile = Path.join(tempDir, CONFIG_FILENAME);
    const cjsFilename = CONFIG_FILENAME.replace(/\.js$/, '.cjs');
    let tempFileCjs = Path.join(tempDir, cjsFilename);

    // copy config file to temp dir
    file_.copyFile({
      src: configFile,
      dest: tempFile
    });

    // rename extension to .cjs
    const contents = file_.readFile(tempFile);
    file_.writeFile(tempFileCjs, contents);

    // todo - delete original temp file

    // console.log('[config-util]', {
    //   tempConfigFile: tempFile,
    //   tempConfigFileCjs: tempFileCjs
    // });

    const ob = await import(tempFileCjs);

    return ob?.default as KnexupConfig;
  }
};