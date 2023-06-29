import { FlatpakApp } from "../models/flatpakApp";

export enum ActionType {
  SET_INSTALLED_APP = "set_installed_app",
  SET_INSTALLED_APPS_BULK = "set_installed_apps_bulk",
}

type Action = {
  type: ActionType;
  payload: FlatpakApp | FlatpakApp[];
};

type State = {
  apps: Map<string, FlatpakApp>;
};

export const defaultState: State = {
  apps: new Map<string, FlatpakApp>(),
};

export const flatpakAppsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SET_INSTALLED_APP: {
      const app = action.payload as FlatpakApp;
      state.apps.set(app.origin + "_" + app.app_id, app);
      return {
        apps: state.apps,
      };
    }
    case ActionType.SET_INSTALLED_APPS_BULK:
      (action.payload as FlatpakApp[]).forEach((app) => {
        state.apps.set(app.origin + "_" + app.app_id, app);
      });

      return {
        apps: state.apps,
      };
    default:
      return state;
  }
};
