import { exec, spawn, ExecException } from "child_process";

export const executeCommand = async (cmd: string): Promise<string> => {
  return new Promise((res, rej) => {
    exec(cmd, (error: ExecException, stdout: string, stderr: string) => {
      if (error) {
        rej(error.message);
      }
      if (stderr) {
        rej(stderr);
      }
      res(stdout);
    });
  });
};

export const spawnCommand = async (cmd: string, args: string[]): Promise<void> => {
  spawn(cmd, args);
  Promise.resolve();
}

