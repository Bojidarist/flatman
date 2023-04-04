const { ipcRenderer } = require("electron");

export const Versions = {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  flatpak: (): Promise<string> => ipcRenderer.invoke("flatpak_version"),
};
