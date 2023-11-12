import Path from 'path';
import { file_ } from '../utils/file-util.js';
import { logNotice } from '../utils/log.util.js';
import { _fn } from '../utils/index.js';

export type GitignoreEditorOpts = {
  projectRoot: string;
  newLines: string[];
}

export function GitignoreEditor(opts: GitignoreEditorOpts) {
  const { projectRoot, newLines } = opts;
  const gitignoreFile = Path.join(projectRoot, '.gitignore');

  const existingContents = _fn(() => {
    if (file_.exists(gitignoreFile)) {
      return file_.readFile(gitignoreFile);
    }
    return '';
  }) || '';

  for (let existingLine of existingContents.split('\n')) {
    for (let i = 0; i < newLines.length; i++) {
      const newLine = newLines[i];
      if (newLine.trim() === existingLine.trim()) {
        // don't repeat line. remove from newLine
        newLines.splice(i, 1);
      }
    }
  }

  const newContents = existingContents + newLines.join('\n');

  if (!file_.exists(gitignoreFile)) {
    logNotice('Creating .gitignore file ...');
  }

  // console.log('[gitignore.editor]', {
  //   existingContents,
  //   newLines
  // });

  file_.writeFile(gitignoreFile, newContents);
}