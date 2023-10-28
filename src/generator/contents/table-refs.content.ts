import { file_ } from '../../utils/file-util.js';
import { TABLE_REFS_FILENAME } from '../../constants.js';
import Path from 'path';
import { knexupUtil } from '../../utils/knexup-util.js';
import { _fn } from '../../utils/index.js';

const tokens = {
  export_const_tableRefs_equals: 'export const tableRefs = ',
  export_const__t_eq_tableRefs_terminate: 'export const _t = tableRefs;'
};

export function buildTableRefsContent(source?: Record<string, string>) {
  const obj = _fn(() => {
    if (source) {
      return source;
    }
    return {};
  });
  return `${tokens.export_const_tableRefs_equals}${printObj(obj)};
${tokens.export_const__t_eq_tableRefs_terminate}`;
}

export async function extractTableRefsObject() {
  const logTag = '\n[extractTableRefsObject]';
  const dir = await knexupUtil.getKnexupDir();
  const tableRefsFile = Path.join(dir, TABLE_REFS_FILENAME);

  let contents = file_.readFile(tableRefsFile) || '';


  const regexes = {
    export_const_tableRefs_equals: new RegExp(`\s*${tokens.export_const_tableRefs_equals}\s*`, 'g'),
    export_const__t_eq_tableRefs_terminate: new RegExp(`\s*${tokens.export_const__t_eq_tableRefs_terminate}\s*`, 'g')
  };

  contents = contents
    .replace(regexes.export_const__t_eq_tableRefs_terminate, '')
    .replace(regexes.export_const_tableRefs_equals, '')
    .replace(/\s/g, '')
    .replace(/;+$/, '');

  console.log(logTag, {
    contents
  });

  const ob = parseObjectString(contents);
  console.log(logTag, {
    ob
  });

  return ob;
}

function printObj(obj: Record<string, string>): string {
  let output = '{\n';

  for (let [k, v] of Object.entries(obj)) {
    output += `  ${k}: '${v}',\n`;
  }

  output = output.replace(/,+\n*$/, '');
  output += '\n}';

  return output;
}

function parseObjectString(s: string): Record<string, string> {
  const obj: any = {};

  // remove braces
  let _s = s.replace(/^\s*\{\s*/, '')
    .replace(/\s*}\s*$/, '');
  console.log({ _s });

  // split by comma
  let entries = _s.split(/\s*,+\s*/);
  console.log({ entries });

  for (let entry of entries) {
    const pair = entry.split(/\s*:\s*/);
    console.log({ pair });

    const k = pair[0];
    const v = pair[1]?.replace(/'/g, '');
    if (k) {
      obj[k] = v;
    }
  }

  console.log({ obj });

  return obj;
}

// parseObjectString(printObj({
//   user: 'user',
//   session: 'session'
// }));