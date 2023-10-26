import { Command } from 'commander';
import { CliOptions } from '../../types.js';
import Path from 'path';
import { projectGenerator } from '../../generator/project-gen/project.generator.js';
import { file_ } from '../../utils/file-util.js';

export async function processCreateProjectCommand(command: Command) {
  const opts = command.opts<CliOptions>();
  const args = command.args;
  const projectName = (args[1] || 'my-knex-project').trim();

  if (!projectName) {
    console.error('! No project name');
    return;
  }

  const destPath = (opts.path?.trim() ? Path.resolve(opts.path?.trim()) : null) || Path.resolve('.');
  const projectRoot = Path.join(destPath, projectName);

  // console.log('[processProjectGenCommand]', {
  //   args,
  //   opts,
  //   projectName,
  //   projectRoot
  // });

  file_.ensureDirPath(projectRoot);

  await projectGenerator(projectRoot, projectName);
}