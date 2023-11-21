import { file_ } from '../utils/file-util.js';
import { logError, logWarn } from '../utils/log.util.js';
import fs from 'fs-extra';

export type PackageJsonEditorOpts = {
  packageJsonFile: string;
  scripts?: Record<string, string>;
  moduleType?: string;
  engines?: Record<string, any>
}

export function PackageJsonEditor(opts: PackageJsonEditorOpts) {
  const { packageJsonFile, scripts, moduleType, engines } = opts;

  if (!file_.exists(packageJsonFile)) {
    logWarn(`${packageJsonFile} does not exist.`);
    return;
  }

  const config = fs.readJsonSync(packageJsonFile);

  if (!config) {
    logError('Unable to read package.json file');
    return;
  }

  let edited = false;

  if (scripts) {
    config['scripts'] = {
      ...config['scripts'],
      ...scripts
    };
    edited = true;
  }

  if (typeof moduleType == 'string') {
    config['type'] = moduleType;
    edited = true;
  }

  if (engines) {
    config['engines'] = {
      ...config['engines'],
      ...engines
    };
    edited = true;
  }

  if (edited) {
    const configJson = JSON.stringify(config, null, 2);
    fs.writeFileSync(packageJsonFile, configJson);
  }

}
