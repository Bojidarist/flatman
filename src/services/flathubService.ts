import axios, { AxiosResponse } from "axios";
import { FlatpakApp } from "../models/flatpakApp";

export class FlathubService {
  private static _instance: FlathubService = new FlathubService();
  private apps: FlatpakApp[] = [];

  private constructor() {
    if (FlathubService._instance) {
      throw new Error(
        "Error: Instantiation failed: Use SingletonClass.getInstance() instead of new."
      );
    }
    FlathubService._instance = this;
  }

  public static getInstance(): FlathubService {
    return FlathubService._instance;
  }

  public async getAppDetails(app_id: string): Promise<AxiosResponse<any, any>> {
    const response = await axios.get(
      "https://flathub.org/api/v1/apps/" + app_id
    );

    return response;
  }
}
