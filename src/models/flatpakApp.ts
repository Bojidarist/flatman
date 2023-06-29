export interface FlatpakApp {
  name: string;
  app_id: string;
  version: string;
  branch: string;
  installation_type: string;
  is_installed: boolean;
  screenshots: string[];
  origin: string;
}

