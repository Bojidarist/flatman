const { ipcMain } = require("electron");
const flatpakService = require("../services/flatpakService");

exports.initHandlers = () => {
  ipcMain.handle("flatpak_version", async () => {
    let version = await flatpakService.getFlatpakVersion();
    return version.replace("\n", "");
  });

  ipcMain.handle("flatpak_get_installed_apps", async () => {
    return await flatpakService.getInstalledApps();
  });
};
