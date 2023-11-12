import { exec, ExecException } from 'child_process';

export const shell_ = {
  exec: (command: string) => {
    return new Promise<string>((resolve, reject) => {
      exec(command, (error: ExecException | null, stdout: string, stderr: string) => {
        if (error) {
          reject(error);
          return;
        }

        if (stderr) {
          reject(stderr);
        }

        resolve(stdout);
      });
    });
  },

  spawn: () => {

  }
};