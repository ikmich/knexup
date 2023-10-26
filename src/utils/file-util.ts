import fs from 'fs-extra';
import Path from 'path';

export type FileCopyOpts = {
  src: string;
  dest: string;
}

export const file_ = {
  exists(file: string): boolean {
    return fs.existsSync(file);
  },

  ensureDirPath(path: string) {
    fs.ensureDirSync(path);
  },

  readFile(filepath: string): string {
    return fs.readFileSync(filepath, { encoding: 'utf-8' });
  },

  writeFile(filePath: string, data: string) {
    fs.writeFileSync(filePath, data);
  },

  joinPaths(...paths: string[]): string {
    return Path.join(...paths);
  },

  copyFile(opts: FileCopyOpts) {
    fs.copyFileSync(opts.src, opts.dest);
  }
};
// export const file_ = fileUtil;