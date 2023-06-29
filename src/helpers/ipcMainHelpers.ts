import { ipcMain } from "electron";
import * as commandHelpers from "../helpers/commandHelpers";
import * as flatpakService from "../services/flatpakService";
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

  ipcMain.handle("flatpak_manage_app", async (event, args) => {
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
