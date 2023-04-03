const { exec } = require("child_process");

exports.executeCommand = async (cmd) => {
  return new Promise((res, rej) => {
    exec(cmd, (error, stdout, stderr) => {
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
