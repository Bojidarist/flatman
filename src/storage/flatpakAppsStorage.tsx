import React from "react";
import { createStore } from "../core/store";
import { defaultState, flatpakAppsReducer } from "./flatpakAppsReducer";

const [Context, FlatpakAppStore] = createStore(
  flatpakAppsReducer,
  defaultState
);

export const FlatpakAppsContext = Context;
export default FlatpakAppStore;
export const useFlatpakAppsStore = () => {
  return React.useContext(Context);
};
