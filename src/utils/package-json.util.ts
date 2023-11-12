import Path from 'path';
import { PROJECT_ROOT } from '../constants.js';
import { createRequire } from 'module';
import { file_ } from './file-util.js';
import { logError, logNotice } from './log.util.js';
import { shell_ } from './shell-util.js';

const require = createRequire(import.meta.url);

export const packageJsonUtil = {
  isDependencyInstalled(dependencyName: string): boolean {
    const pkgJsonFile = Path.join(PROJECT_ROOT, 'package.json');
    if (!file_.exists(pkgJsonFile)) {
      logError(`!error! package.json not found.`);
      return false;
    }

    const pkgConfig = require(pkgJsonFile);
    const dependenciesMap = pkgConfig['dependencies'];
    const devDependenciesMap = pkgConfig['devDependencies'];

    return Object.keys(dependenciesMap).includes(dependencyName) || Object.keys(devDependenciesMap).includes(dependencyName);
  },

  async installDependencies(dependencies: string[]) {
    const filtered: string[] = [];
    for (let dep of dependencies) {
      if (!this.isDependencyInstalled(dep)) {
        filtered.push(dep);
      }
    }

    if (!filtered.length) {
      // logNotice(`dependencies "${dependencies.join(', ')}" already installed`);
      return;
    }

    let spaceSeparated = filtered.join(' ');
    let commaSeparated = filtered.join(', ');
    logNotice(`Installing dependencies: ${commaSeparated} ...`);
    try {
      const output = await shell_.exec(`cd ${PROJECT_ROOT} && npm install ${spaceSeparated}`);
      console.log(output);
    } catch (e: any) {
      logError(e);
    }
  },

  async installDevDependencies(devDependencies: string[]) {
    const filtered: string[] = [];
    for (let dep of devDependencies) {
      if (!this.isDependencyInstalled(dep)) {
        filtered.push(dep);
      }
    }

    if (!filtered.length) {
      // logNotice(`dependencies "${dependencies.join(', ')}" already installed`);
      return;
    }

    let spaceSeparated = filtered.join(' ');
    let commaSeparated = filtered.join(', ');
    logNotice(`Installing dependencies: ${commaSeparated} ...`);
    try {
      const output = await shell_.exec(`cd ${PROJECT_ROOT} && npm install -D ${spaceSeparated}`);
      console.log(output);
    } catch (e: any) {
      logError(e);
    }
  }
};