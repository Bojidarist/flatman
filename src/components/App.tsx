import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFlatpakAppsStore } from "../storage/flatpakAppsStorage";
import { ActionType } from "../storage/flatpakAppsReducer";
import * as flathubService from "../services/flathubService";

export const App = () => {
  const [versionMessage, setVersionMessage] =
    useState<string>("Loading version...");
  const [searchInput, setSearchInput] = useState("");
  const flatpakStore = useFlatpakAppsStore();

  useEffect(() => {
    const setInitialStates = async () => {
      setVersionMessage(await window.versions.flatpak());

      if (flatpakStore.state.apps.size == 0) {
        flatpakStore.dispatch({
          type: ActionType.SET_INSTALLED_APPS_BULK,
          payload: await flathubService.setAppsDetails(
            await window.flatpak.getAllApps()
          ),
        });
      }
    };

    setInitialStates();
  }, []);

  const handleSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value);
  };

  return (
    <div>
      <Link to={"/remote_list"}>Go To Remote</Link>

      <h1>{versionMessage}</h1>

      <div>
        <input
          type="search"
          placeholder="Search"
          onChange={handleSearchChange}
          value={searchInput}
        ></input>
      </div>

      {[...flatpakStore.state.apps.values()]
        .filter(
          (app) =>
            app.is_installed &&
            app.name.toLowerCase().includes(searchInput.toLowerCase())
        )
        .slice(0, 100)
        .map((app, idx) => (
          <div key={idx} className="bg-gray-500 text-center text-white">
            <Link to={"/app"} state={{ app: app, back_url: "/" }}>
              <img src={app.icon_url} width="32" height="32" />
              <p>{app.name}</p>
              <p>{app.summary}</p>
            </Link>
          </div>
        ))}
    </div>
  );
};
