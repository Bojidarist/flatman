import { ipcMain } from "electron";
import * as flatpakService from "../services/flatpakService";
import { FlatpakAppManager } from "../services/flatpakAppManager";
import { FlatpakApp } from "../models/flatpakApp";
import { FlathubService } from "../services/flathubService";

export const initHandlers = (): void => {
  ipcMain.handle("flatpak_version", async () => {
    return await flatpakService.getFlatpakVersion();
  });

  ipcMain.handle("flatpak_get_all_apps", async () => {
    const installed = await flatpakService.getInstalledApps();
    const remote = await flatpakService.getRemoteApps();
    return installed.concat(remote);
  });

  ipcMain.handle("flatpak_get_installed_apps", async () => {
    return (await FlatpakAppManager.getInstance().getApps()).filter(
      (app: FlatpakApp) => app.is_installed
    );
  });

  ipcMain.handle("flatpak_get_remote_apps", async () => {
    return (await FlatpakAppManager.getInstance().getApps()).filter(
      (app: FlatpakApp) => !app.is_installed
    );
  });

  ipcMain.handle("flatpak_manage_app", async (event, args) => {
    const app = args as FlatpakApp;
    return await FlatpakAppManager.getInstance().manageApp(app);
  });

  ipcMain.handle("flatpak_get_app_details", async (event, args) => {
    const app = args as FlatpakApp;
    switch (app.origin) {
      case "flathub":
        return (await FlathubService.getInstance().getAppDetails(app.app_id))
          .data;
      default:
        return;
    }
  });
};
