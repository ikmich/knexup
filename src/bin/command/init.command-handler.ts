import { Command } from 'commander';
import { CONFIG_FILENAME, PROJECT_ROOT_DEFAULT } from '../../constants.js';
import { ConfigFileGenerator } from '../../generator/config-file.generator.js';
import { GitignoreEditor } from '../../editor/gitignore.editor.js';

export async function initCommandHandler(command: Command) {
  ConfigFileGenerator(PROJECT_ROOT_DEFAULT);

  // Update gitignore file (knexup-config.(c)js)
  GitignoreEditor({
    projectRoot: PROJECT_ROOT_DEFAULT,
    newLines: [CONFIG_FILENAME]
  });
}
