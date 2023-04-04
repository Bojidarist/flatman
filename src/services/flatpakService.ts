import { FlatpakApp } from "../models/flatpakApp";

import * as commandHelpers from "../helpers/commandHelpers";

exports.getFlatpakVersion = async (): Promise<string> => {
  let version = await commandHelpers.executeCommand("flatpak --version");
  return version.replace("\n", "");
};

exports.getInstalledApps = async (): Promise<Array<FlatpakApp>> => {
  let result = await commandHelpers.executeCommand("flatpak list --app");
  return result
    .split("\n")
    .filter((line: any) => line.split("\t")[0].trim() !== "")
    .map((line: any) => {
      let row = line.split("\t");
      return new FlatpakApp(row[0], row[1], row[2], row[3], row[4]);
    });
};
