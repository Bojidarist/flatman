import { FlatpakApp } from "../models/flatpakApp";
import * as flatpakService from "./flatpakService";
import * as commandHelpers from "../helpers/commandHelpers";

export class FlatpakAppManager {
  private static _instance: FlatpakAppManager = new FlatpakAppManager();
  private apps: FlatpakApp[] = [];
  // private installedApps: FlatpakApp[] = [];
  // private remoteApps: FlatpakApp[] = [];

  private constructor() {
    if (FlatpakAppManager._instance) {
      throw new Error(
        "Error: Instantiation failed: Use SingletonClass.getInstance() instead of new."
      );
    }
    FlatpakAppManager._instance = this;
  }

  public static getInstance(): FlatpakAppManager {
    return FlatpakAppManager._instance;
  }

  public getApps = async (): Promise<FlatpakApp[]> => {
    if (this.apps.length == 0) {
      const installed = await flatpakService.getInstalledApps();
      const remote = await flatpakService.getRemoteApps();
      this.apps = installed.concat(remote);
    }

    return this.apps;
  };

  public async manageApp(app: FlatpakApp) {
    if (!app.is_installed) {
      await commandHelpers.executeCommand(
        "flatpak install " + app.app_id + " -y"
      );
    } else {
      await commandHelpers.executeCommand(
        "flatpak uninstall " + app.app_id + " -y"
      );
    }

    let appIdx = this.apps.findIndex((x) => x.app_id == app.app_id);
    this.apps[appIdx].is_installed = !app.is_installed;
  }

  // public getInstalledApps = async (): Promise<FlatpakApp[]> => {
  //   if (this.installedApps.length == 0) {
  //     const apps = await flatpakService.getInstalledApps();
  //     this.installedApps = this.installedApps.concat(apps);
  //   }

  //   return this.installedApps;
  // };

  // public getRemoteApps = async (): Promise<FlatpakApp[]> => {
  //   if (this.remoteApps.length == 0) {
  //     const apps = await flatpakService.getRemoteApps();
  //     this.remoteApps = this.remoteApps.concat(apps);
  //   }

  //   return this.remoteApps;
  // };
}
