import { FlatpakApp } from "../models/flatpakApp";

import * as commandHelpers from "../helpers/commandHelpers";

export const getFlatpakVersion = async (): Promise<string> => {
  const version = await commandHelpers.executeCommand("flatpak --version");
  return version.replace("\n", "");
};

export const getInstalledApps = async (): Promise<FlatpakApp[]> => {
  const result = await commandHelpers.executeCommand(
    "flatpak list --app --columns=name,application,version,branch,installation,origin"
  );
  return result
    .split("\n")
    .filter((line: string) => line.split("\t")[0].trim() !== "")
    .map((line: string) => {
      const row = line.split("\t");
      return {
        name: row[0],
        app_id: row[1],
        version: row[2],
        branch: row[3],
        installation_type: row[4],
        is_installed: true,
        screenshots: [],
        origin: row[5],
      };
    });
};

export const getRemoteApps = async (): Promise<FlatpakApp[]> => {
  const installedApps = await getInstalledApps();
  const installedAppsIds = installedApps.map((app) => app.app_id);
  const not_installed = await commandHelpers.executeCommand(
    "flatpak remote-ls --app --columns=name,application,version,branch,origin"
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
      return {
        name: row[0],
        app_id: row[1],
        version: row[2],
        branch: row[3],
        installation_type: null,
        is_installed: false,
        screenshots: [],
        origin: row[4]
      };
    });

  return not_installed_map;
};
