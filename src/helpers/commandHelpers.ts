import { exec, ExecException } from "child_process";

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
