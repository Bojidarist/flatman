import { FlatpakApp } from "../models/flatpakApp";

import * as commandHelpers from "../helpers/commandHelpers";

export const getFlatpakVersion = async (): Promise<string> => {
  let version = await commandHelpers.executeCommand("flatpak --version");
  return version.replace("\n", "");
};

export const getInstalledApps = async (): Promise<FlatpakApp[]> => {
  let result = await commandHelpers.executeCommand("flatpak list --app");
  return result
    .split("\n")
    .filter((line: string) => line.split("\t")[0].trim() !== "")
    .map((line: string) => {
      let row = line.split("\t");
      return new FlatpakApp(row[0], row[1], row[2], row[3], row[4], true);
    });
};
