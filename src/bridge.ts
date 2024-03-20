import { FlatpakApp } from "./models/flatpakApp";

import { ipcRenderer } from "electron";

export const Versions = {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  flatpak: async (): Promise<string> =>
    await ipcRenderer.invoke("flatpak_version"),
};

export const Flatpak = {
  getAllApps: async (): Promise<FlatpakApp[]> =>
    await ipcRenderer.invoke("flatpak_get_all_apps"),
  getInstalledApps: async (): Promise<FlatpakApp[]> =>
    await ipcRenderer.invoke("flatpak_get_installed_apps"),
  getRemoteApps: async (): Promise<FlatpakApp[]> =>
    await ipcRenderer.invoke("flatpak_get_remote_apps"),
  manageApp: async (app: FlatpakApp): Promise<void> =>
    await ipcRenderer.invoke("flatpak_manage_app", app),
  openApp: async (app: FlatpakApp): Promise<void> =>
    await ipcRenderer.invoke("flatpak_open_app", app),
  getAppDetails: async (app: FlatpakApp): Promise<any> =>
    await ipcRenderer.invoke("flatpak_get_app_details", app),
};
