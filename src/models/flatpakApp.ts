export class FlatpakApp {
  name: string;
  app_id: string;
  version: string;
  branch: string;
  installation_type: string;

  constructor(
    name = "",
    app_id = "",
    version = "",
    branch = "",
    installation_type = ""
  ) {
    this.name = name;
    this.app_id = app_id;
    this.version = version;
    this.branch = branch;
    this.installation_type = installation_type;
  }
}
