import { ipcMain } from "electron";
import * as flatpakService from "../services/flatpakService";

export const initHandlers = (): void => {
  ipcMain.handle("flatpak_version", async () => {
    return await flatpakService.getFlatpakVersion();
  });

  ipcMain.handle("flatpak_get_installed_apps", async () => {
    return await flatpakService.getInstalledApps();
  });

  ipcMain.handle("flatpak_get_remote_apps", async () => {
    return await flatpakService.getRemoteApps();
  });
};
