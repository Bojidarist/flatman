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
    "https://flathub.org/api/v2/collection/popular?locale=en"
  );

  const appsDataHash = new Map<string, FlathubAppsResponse>();
  const popularIndex = new Map<string, number>();
  response.data.hits.forEach((data, index) => {
    appsDataHash.set(data.app_id, data);
    popularIndex.set(data.app_id, index);
  });

  for (let i = 0; i < apps.length; i++) {
    if (appsDataHash.has(apps[i].app_id)) {
      const data = appsDataHash.get(apps[i].app_id);
      apps[i].summary = data.summary;
      apps[i].icon_url = data.icon;
    }
  }

  const popularApps = apps
    .filter((app) => popularIndex.has(app.app_id))
    .sort(
      (a, b) =>
        (popularIndex.get(a.app_id) as number) -
        (popularIndex.get(b.app_id) as number)
    );
  const nonPopularApps = apps.filter((app) => !popularIndex.has(app.app_id));

  return [...popularApps, ...nonPopularApps];
};

export const getAppDetails = async (app: FlatpakApp): Promise<FlatpakApp> => {
  try {
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
  } catch (error) {
    // If API call fails, leave screenshots as is
  }

  return app;
};
