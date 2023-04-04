const { ipcMain } = require("electron");
const flatpakService = require("../services/flatpakService");

export const initHandlers = (): void => {
  ipcMain.handle("flatpak_version", async () => {
    return await flatpakService.getFlatpakVersion();
  });

  ipcMain.handle("flatpak_get_installed_apps", async () => {
    return await flatpakService.getInstalledApps();
  });
};
