export interface FlatpakApp {
  name: string;
  app_id: string;
  version: string;
  branch: string;
  installation_type: string;
  is_installed: boolean;
  summary: string;
  icon_url: string;
  screenshots: string[];
  origin: string;
}
