const commandHelpers = require("../helpers/commandHelpers");

exports.getFlatpakVersion = async () => {
  return commandHelpers.executeCommand("flatpak --version");
};
