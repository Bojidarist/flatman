import { FlatpakApp } from "../models/flatpakApp";

export enum ActionType {
  SET_INITIAL_APPS = "set_initial_apps",
  SET_INSTALLED_APP = "set_installed_app",
  SET_INSTALLED_APPS_BULK = "set_installed_apps_bulk",
  REMOVE_INSTALLED_APP = "remove_installed_app",
}

type Action = {
  type: ActionType;
  payload: FlatpakApp | FlatpakApp[];
};

type State = {
  installedApps: FlatpakApp[];
  apps: Map<string, FlatpakApp>;
};

export const defaultState: State = {
  installedApps: [],
  apps: new Map<string, FlatpakApp>(),
};

export const flatpakAppsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SET_INITIAL_APPS:
      (action.payload as FlatpakApp[]).forEach((app) => {
        state.apps.set(app.origin + "_" + app.app_id, app);
      });

      return {
        installedApps: state.installedApps,
        apps: state.apps,
      };
    case ActionType.SET_INSTALLED_APP:
      return {
        installedApps: [...state.installedApps, action.payload as FlatpakApp],
        apps: state.apps,
      };
    case ActionType.SET_INSTALLED_APPS_BULK:
      return {
        installedApps: [
          ...state.installedApps,
          ...(action.payload as FlatpakApp[]),
        ],
        apps: state.apps,
      };
    case ActionType.REMOVE_INSTALLED_APP:
      return {
        installedApps: state.installedApps.filter(
          (app) => app.app_id != (action.payload as FlatpakApp).app_id
        ),
        apps: state.apps,
      };
    default:
      return state;
  }
};
