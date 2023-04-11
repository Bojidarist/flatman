import { FlatpakApp } from "../models/flatpakApp";

import * as commandHelpers from "../helpers/commandHelpers";

export const getFlatpakVersion = async (): Promise<string> => {
  const version = await commandHelpers.executeCommand("flatpak --version");
  return version.replace("\n", "");
};

export const getInstalledApps = async (): Promise<FlatpakApp[]> => {
  const result = await commandHelpers.executeCommand("flatpak list --app");
  return result
    .split("\n")
    .filter((line: string) => line.split("\t")[0].trim() !== "")
    .map((line: string) => {
      const row = line.split("\t");
      return new FlatpakApp(row[0], row[1], row[2], row[3], row[4], true);
    });
};

export const getRemoteApps = async (): Promise<FlatpakApp[]> => {
  const installedApps = await getInstalledApps();
  const installedAppsIds = installedApps.map((app) => app.app_id);
  const not_installed = await commandHelpers.executeCommand(
    "flatpak remote-ls --app"
  );
  const not_installed_map = not_installed
    .split("\n")
    .filter(
      (line: string) =>
        line.split("\t")[0].trim() !== "" &&
        !installedAppsIds.includes(line.split("\t")[1].trim())
    )
    .map((line: string) => {
      const row = line.split("\t");
      return new FlatpakApp(row[0], row[1], row[2], row[3], null, false);
    });

  return installedApps.concat(not_installed_map);
};
