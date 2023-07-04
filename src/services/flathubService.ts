import axios, { AxiosResponse } from "axios";
import { FlatpakApp } from "../models/flatpakApp";

type FlathubAppsResponse = {
  flatpakAppId: string;
  name: string;
  summary: string;
  iconDesktopUrl: string;
};

type FlathubScreenshot = {
  imgDesktopUrl: string;
  imgMobileUrl: string;
  thumbUrl: string;
};

type FlathubAppResponse = {
  flatpakAppId: string;
  name: string;
  summary: string;
  description: string;
  donationUrl: string;
  developerName: string;
  screenshots: FlathubScreenshot[];
};

export const setAppsDetails = async (
  apps: FlatpakApp[]
): Promise<FlatpakApp[]> => {
  const response = await axios.get<FlathubAppsResponse[]>(
    "https://flathub.org/api/v1/apps"
  );

  const appsDataHash = new Map<string, FlathubAppsResponse>();
  response.data.forEach((data) => appsDataHash.set(data.flatpakAppId, data));
  for (let i = 0; i < apps.length; i++) {
    if (appsDataHash.has(apps[i].app_id)) {
      const data = appsDataHash.get(apps[i].app_id);
      apps[i].summary = data.summary;
      apps[i].icon_url = data.iconDesktopUrl;
    }
  }

  return apps;
};

export const getAppDetails = async (app: FlatpakApp): Promise<FlatpakApp> => {
  const response = await axios.get<FlathubAppResponse>(
    "https://flathub.org/api/v1/apps/" + app.app_id
  );
  const responseData = response.data;
  if (responseData.screenshots.length > 0) {
    app.screenshots = responseData.screenshots.map((screenshot) => {
      return screenshot.imgDesktopUrl;
    });
  }

  return app;
};
