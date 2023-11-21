import { file_ } from '../../utils/file-util.js';
import { SCHEMA_DIR_NAME_DEFAULT, TABLE_REFS_FILENAME } from '../../constants.js';
import { buildTableRefsContent, extractTableRefsObject } from '../contents/table-refs.content.js';
import { _fn } from '../../utils/index.js';
import { logInfo, logNotice, logWarn } from '../../utils/log.util.js';
import Path from 'path';

export async function TableRefsFileGenerator(knexDirPath: string, table?: string | null) {
  let logTag = '[tableRefsFileGenerator]';

  const targetDirPath = Path.join(knexDirPath, SCHEMA_DIR_NAME_DEFAULT);
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
