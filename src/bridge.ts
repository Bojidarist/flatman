import { FlatpakApp } from "./models/flatpakApp";

const { ipcRenderer } = require("electron");

export const Versions = {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  flatpak: async (): Promise<string> =>
    await ipcRenderer.invoke("flatpak_version"),
};

export const Flatpak = {
  getInstalledApps: async (): Promise<FlatpakApp[]> =>
    await ipcRenderer.invoke("flatpak_get_installed_apps"),
};
