import { file_ } from '../utils/file-util.js';
import { KNEXUP_DIR, TABLE_REFS_FILENAME } from '../constants.js';
import chalk from 'chalk';
import { buildTableRefsContent, extractTableRefsObject } from './contents/table-refs.content.js';
import { _fn } from '../utils/index.js';

export async function tableRefsFileGenerator(targetDirPath: string, table?: string | null) {
  let logTag = '\n[tableRefsFileGenerator]';
  file_.ensureDirPath(targetDirPath);

  let filename = TABLE_REFS_FILENAME;
  const file = file_.joinPaths(targetDirPath, filename);

  let ob = _fn(() => {
    if (table) {
      return {
        [table]: table
      };
    }
    return {};
  });

  console.log(logTag, {
    ob
  });

  if (file_.exists(file)) {
    if (table) {
      console.log(
        chalk.yellowBright(`-> Ensure to add entry for ${table} in the tableRefs object.`)
      );
    }

    return;
  }

  file_.writeFile(file, buildTableRefsContent(ob));

  console.log(chalk.blueBright(`-> ${filename} created in ${targetDirPath}`));
}

// export async function tableRefsFileGenerator(targetDirPath: string, table?: string | null) {
//   let logTag = '\n[tableRefsFileGenerator]';
//   file_.ensureDirPath(targetDirPath);
//
//   let filename = TABLE_REFS_FILENAME;
//   const file = file_.joinPaths(targetDirPath, filename);
//
//   let ob = _fn(() => {
//     if (table) {
//       return {
//         [table]: table
//       };
//     }
//     return {};
//   });
//
//   console.log(logTag, 'BEFORE', {
//     ob
//   });
//
//   if (file_.exists(file)) {
//     if (table) {
//       console.log(chalk.yellow('-> table-refs file exists. Attempting to update it...'));
//
//       const ob0: any = await extractTableRefsObject();
//       console.log(logTag, {
//         ob0
//       });
//
//       // merge objects
//       ob = {
//         ...ob0,
//         ...ob
//       };
//
//       console.log(logTag, 'AFTER', {
//         ob
//       });
//     }
//     // return;
//   }
//
//
//   file_.writeFile(file, buildTableRefsContent(ob));
//
//   console.log(chalk.blueBright(`-> ${filename} created in ${targetDirPath}`));
// }
