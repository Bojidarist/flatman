import axios from "axios";
import { FlatpakApp } from "../models/flatpakApp";

type FlathubAppsResponse = {
  app_id: string;
  name: string;
  summary: string;
  icon: string;
};

type FlathubAppResponse = {
  description: string;
  developer_name: string;
  icon: string;
  name: string;
  screenshots: Array<{
    sizes: Array<{
      src: string;
      width: number;
      height: number;
      scale: string;
    }>;
  }>;
};

export const setAppsDetails = async (
  apps: FlatpakApp[]
): Promise<FlatpakApp[]> => {
  const response = await axios.get<{ hits: FlathubAppsResponse[] }>(
    "https://flathub.org/api/v2/collection/popular"
  );

  const appsDataHash = new Map<string, FlathubAppsResponse>();
  response.data.hits.forEach((data) => appsDataHash.set(data.app_id, data));
  for (let i = 0; i < apps.length; i++) {
    if (appsDataHash.has(apps[i].app_id)) {
      const data = appsDataHash.get(apps[i].app_id);
      apps[i].summary = data.summary;
      apps[i].icon_url = data.icon;
    }
  }

  return apps;
};

export const getAppDetails = async (app: FlatpakApp): Promise<FlatpakApp> => {
  const response = await axios.get<FlathubAppResponse>(
    "https://flathub.org/api/v2/appstream/" + app.app_id
  );
  const responseData = response.data;
  if (responseData.screenshots.length > 0) {
    app.screenshots = responseData.screenshots.map((screenshot) => {
      const sizes = screenshot.sizes;
      const maxSize = sizes.reduce(
        (max, size) => (size.width > max.width ? size : max),
        sizes[0]
      );
      return maxSize.src;
    });
  }

  return app;
};
