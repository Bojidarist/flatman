import { FlatpakApp } from "../models/flatpakApp";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFlatpakAppsStore } from "../storage/flatpakAppsStorage";
import { ActionType } from "../storage/flatpakAppsReducer";
import * as flathubService from "../services/flathubService";
import { Spinner } from "./shared/Spinner";

export const FlatpakAppView = () => {
  const viewState = useLocation().state as {
    app: FlatpakApp;
    back_url: string;
  };

  const [isInstalling, setIsInstalling] = useState<boolean>(false);
  const flatpakStore = useFlatpakAppsStore();
  let app = flatpakStore.state.apps.get(
    viewState.app.origin + "_" + viewState.app.app_id
  );

  useEffect(() => {
    const setInitialStates = async () => {
      if (app.origin == "flathub" && app.screenshots.length == 0) {
        app = await flathubService.getAppDetails(app);
        flatpakStore.dispatch({
          type: ActionType.SET_INSTALLED_APP,
          payload: app,
        });
      }
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
      <Spinner active={isInstalling} disableSpinner={isInstalling} />
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

      <div>
        <p>Screenshots: </p>
        {app.screenshots.map((screenshotUrl: string, idx: number) => (
          <img key={idx} src={screenshotUrl} />
        ))}
      </div>

      <button onClick={installAppBtnClick} disabled={isInstalling}>
        {app.is_installed ? "Remove" : "Install"}
      </button>
    </div>
  );
};
