const commandHelpers = require("../helpers/commandHelpers");

exports.getFlatpakVersion = async () => {
  return commandHelpers.executeCommand("flatpak --version");
};

exports.getInstalledApps = async () => {
  let result = await commandHelpers.executeCommand("flatpak list --app");
  return result
    .split("\n")
    .filter((line) => line.split("\t")[0].trim() !== "")
    .map((line) => {
      let row = line.split("\t");
      return {
        name: row[0],
        app_id: row[1],
        version: row[2],
        branch: row[3],
        installation_type: row[4],
      };
    });
};
