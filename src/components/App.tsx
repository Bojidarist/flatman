import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFlatpakAppsStore } from "../storage/flatpakAppsStorage";
import { ActionType } from "../storage/flatpakAppsReducer";

export const App = () => {
  const [versionMessage, setVersionMessage] =
    useState<string>("Loading version...");
  const flatpakStore = useFlatpakAppsStore();

  useEffect(() => {
    const setInitialStates = async () => {
      setVersionMessage(await window.versions.flatpak());

      if (flatpakStore.state.apps.size == 0) {
        flatpakStore.dispatch({
          type: ActionType.SET_INSTALLED_APPS_BULK,
          payload: await window.flatpak.getAllApps(),
        });
      }
    };

    setInitialStates();
  }, []);

  return (
    <div>
      <Link to={"/remote_list"}>Go To Remote</Link>
      <h1>{versionMessage}</h1>
      {[...flatpakStore.state.apps.values()]
        .filter((app) => app.is_installed)
        .map((app, idx) => (
          <div key={idx} className="bg-gray-500 text-center text-white">
            <Link to={"/app"} state={{ app: app, back_url: "/" }}>
              {app.name}
            </Link>
          </div>
        ))}
    </div>
  );
};
