import { FlatpakApp } from "../models/flatpakApp";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFlatpakAppsStore } from "../storage/flatpakAppsStorage";
import { ActionType } from "../storage/flatpakAppsReducer";

export const FlatpakAppView = () => {
  const viewState = useLocation().state as {
    app: FlatpakApp;
    back_url: string;
  };

  const [isInstalling, setIsInstalling] = useState<boolean>(false);
  const [appDetails, setAppDetails] = useState<any>();
  const flatpakStore = useFlatpakAppsStore();
  const app = flatpakStore.state.apps.get(
    viewState.app.origin + "_" + viewState.app.app_id
  );

  useEffect(() => {
    const setInitialStates = async () => {
      setAppDetails(await window.flatpak.getAppDetails(app));
    };

    setInitialStates();
  }, []);

  const installAppBtnClick = async () => {
    setIsInstalling(true);
    await window.flatpak.manageApp(app);
    app.is_installed = !app.is_installed;
    flatpakStore.dispatch({
      type: ActionType.SET_INSTALLED_APP,
      payload: app,
    });
    setIsInstalling(false);
  };

  return (
    <div>
      <h1>
        <Link to={viewState.back_url}>{"<"}</Link>
      </h1>
      <h2>{app.name}</h2>
      <p>ID: {app.app_id}</p>
      <p>Version: {app.version}</p>
      <p>Branch: {app.branch}</p>
      <p>
        {app.is_installed
          ? "Application is installed!"
          : "Application is not installed!"}
      </p>

      {(appDetails != null || appDetails != undefined) && (
        <div>
          <p>Screenshots: </p>
          <p>
            {appDetails["screenshots"].map((x: any, idx: number) => (
              <div key={idx}>{x["imgDesktopUrl"]}</div>
            ))}
          </p>
        </div>
      )}

      <button onClick={installAppBtnClick} disabled={isInstalling}>
        {app.is_installed ? "Remove" : "Install"}
      </button>
    </div>
  );
};
