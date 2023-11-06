import { file_ } from '../utils/file-util.js';
import { logError, logWarn } from '../utils/log.util.js';
import fs from 'fs-extra';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export type PackageJsonEditorOpts = {
  packageJsonFile: string;
  scripts?: Record<string, string>;
  type?: string;
  engines?: Record<string, any>
}

export function packageJsonEditor(opts: PackageJsonEditorOpts) {
  const { packageJsonFile, scripts, type, engines } = opts;

  if (!file_.exists(packageJsonFile)) {
    logWarn(`${packageJsonFile} does not exist.`);
    return;
  }

  const config = require(packageJsonFile);
  // const config = fs.readJsonSync(packageJsonFile)

  if (!config) {
    logError('Unable to read package.json file');
    return;
  }

  let edited = false;

  if (scripts) {
    config['scripts'] = scripts;
    edited = true;
  }

  if (type) {
    config['type'] = type;
    edited = true;
  }

  if (engines) {
    config['engines'] = engines;
    edited = true;
  }

  if (edited) {
    const configJson = JSON.stringify(config, null, 2);
    console.log({
      configJson
    });

    fs.writeFileSync(packageJsonFile, configJson);
  }

}
