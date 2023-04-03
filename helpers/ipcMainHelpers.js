const { ipcMain } = require("electron");
const flatpakService = require("../services/flatpakService");

exports.initHandlers = () => {
  ipcMain.handle("flatpak_version", async () => {
    let version = await flatpakService.getFlatpakVersion();
    return version.replace("\n", "");
  });
};
