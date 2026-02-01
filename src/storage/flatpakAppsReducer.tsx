import { FlatpakApp } from "../models/flatpakApp";

export enum ActionType {
  SET_INSTALLED_APP = "set_installed_app",
  SET_INSTALLED_APPS_BULK = "set_installed_apps_bulk",
  SET_SELECTED_TAB = "set_selected_tab",
}

type Action = {
  type: ActionType;
  payload: FlatpakApp | FlatpakApp[] | string;
};

type State = {
  apps: Map<string, FlatpakApp>;
  selectedTab: string;
};

export const defaultState: State = {
  apps: new Map<string, FlatpakApp>(),
  selectedTab: "/",
};

export const flatpakAppsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SET_INSTALLED_APP: {
      const app = action.payload as FlatpakApp;
      state.apps.set(app.origin + "_" + app.app_id, app);
      return {
        apps: state.apps,
        selectedTab: state.selectedTab,
      };
    }
    case ActionType.SET_INSTALLED_APPS_BULK:
      (action.payload as FlatpakApp[]).forEach((app) => {
        state.apps.set(app.origin + "_" + app.app_id, app);
      });

      return {
        apps: state.apps,
        selectedTab: state.selectedTab,
      };
    case ActionType.SET_SELECTED_TAB:
      state.selectedTab = action.payload as string;

      return {
        apps: state.apps,
        selectedTab: state.selectedTab,
      }
    default:
      return state;
  }
};
