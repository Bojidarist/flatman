import { ipcMain } from "electron";
import * as commandHelpers from "../helpers/commandHelpers";
import * as flatpakService from "../services/flatpakService";
import { FlatpakApp } from "../models/flatpakApp";

export const initHandlers = (): void => {
  ipcMain.handle("flatpak_version", async () => {
    return await flatpakService.getFlatpakVersion();
  });

  ipcMain.handle("flatpak_get_all_apps", async () => {
    const installed = await flatpakService.getInstalledApps();
    const remote = await flatpakService.getRemoteApps();
    return installed.concat(remote);
  });

  ipcMain.handle("flatpak_manage_app", async (_, args) => {
    const app = args as FlatpakApp;
    if (!app.is_installed) {
      await commandHelpers.executeCommand(
        "flatpak install " + app.app_id + " -y"
      );
    } else {
      await commandHelpers.executeCommand(
        "flatpak uninstall " + app.app_id + " -y"
      );
    }
  });

  ipcMain.handle("flatpak_open_app", async (_, args) => {
    const app = args as FlatpakApp;
    if (app.is_installed) {
      await commandHelpers.spawnCommand("flatpak", ["run", app.app_id]);
    }
  });
};
