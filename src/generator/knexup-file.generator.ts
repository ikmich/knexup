import { file_ } from '../utils/file-util.js';
import { KNEXUP_FILENAME } from '../constants.js';
import chalk from 'chalk';

export async function knexupFileGenerator(targetDirPath: string) {
  // generate file for table refs
  file_.ensureDirPath(targetDirPath);

  const filename = KNEXUP_FILENAME;
  const file = file_.joinPaths(targetDirPath, filename);

  if (file_.exists(file)) {
    return;
  }

  // #!/usr/bin/env node
  const contents = `// knexup.ts
`;

  // write contents to file
  file_.writeFile(file, contents, { encoding: 'utf-8' });
  // fs.writeFileSync(file, contents, { encoding: 'utf-8', mode: 0o766 });
  console.log(chalk.blueBright(`-> ${filename} created in ${targetDirPath}`));
}