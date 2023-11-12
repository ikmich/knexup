import { file_ } from '../utils/file-util.js';
import { TABLE_REFS_FILENAME } from '../constants.js';
import { buildTableRefsContent, extractTableRefsObject } from './contents/table-refs.content.js';
import { _fn } from '../utils/index.js';
import { logInfo, logNotice, logWarn } from '../utils/log.util.js';

export async function tableRefsFileGenerator(targetDirPath: string, table?: string | null) {
  let logTag = '[tableRefsFileGenerator]';
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

  // console.log(logTag, {
  //   ob
  // });

  const shouldUpdateRefsFile = true;

  if (file_.exists(file)) {
    if (table) {
      if (shouldUpdateRefsFile) {
        logNotice('table-refs file exists. Will attempt to update it...');

        let ob0 = null;
        let isExtractionSuccess = false;

        try {
          ob0 = await extractTableRefsObject();
          isExtractionSuccess = true;
        } catch (e) {
          logWarn(`WARN - Unable to modify table-refs file. You must manually add entry for table ${table} in the table-refs object.`);
        }

        if (isExtractionSuccess) {
          // console.log(logTag, {
          //   ob0
          // });

          // merge objects
          ob = {
            ...ob0,
            ...ob
          };

          // console.log(logTag, 'AFTER', {
          //   ob
          // });
        }
      } else {
        logNotice(`Ensure to add entry for ${table} in the tableRefs object.`);
      }
    } else {
      logWarn(`No table option passed.`);
    }

    if (!shouldUpdateRefsFile) {
      return;
    }
  }

  file_.writeFile(file, buildTableRefsContent(ob));

  logInfo(`${filename} created in ${targetDirPath}`);
}

/*export async function tableRefsFileGenerator(targetDirPath: string, table?: string | null) {
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

  console.log(logTag, 'BEFORE', {
    ob
  });

  if (file_.exists(file)) {
    if (table) {
      console.log(chalk.yellow('table-refs file exists. Attempting to update it...'));

      const ob0: any = await extractTableRefsObject();
      console.log(logTag, {
        ob0
      });

      // merge objects
      ob = {
        ...ob0,
        ...ob
      };

      console.log(logTag, 'AFTER', {
        ob
      });
    }
    // return;
  }


  file_.writeFile(file, buildTableRefsContent(ob));

  console.log(chalk.blueBright(`${filename} created in ${targetDirPath}`));
}*/
