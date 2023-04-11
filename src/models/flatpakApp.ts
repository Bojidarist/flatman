export class FlatpakApp {
  name: string;
  app_id: string;
  version: string;
  branch: string;
  installation_type: string;
  is_installed: boolean;

  constructor(
    name = "",
    app_id = "",
    version = "",
    branch = "",
    installation_type = "",
    is_installed = false
  ) {
    this.name = name;
    this.app_id = app_id;
    this.version = version;
    this.branch = branch;
    this.installation_type = installation_type;
    this.is_installed = is_installed;
  }
}
