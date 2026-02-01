import { useEffect, useState } from "react";
import { useFlatpakAppsStore } from "../storage/flatpakAppsStorage";
import { ActionType } from "../storage/flatpakAppsReducer";
import * as flathubService from "../services/flathubService";
import { Spinner } from "./shared/Spinner";
import { Layout } from "./shared/Layout";
import { SearchBar } from "./SearchBar";
import { AppCard } from "./AppCard";

export const App = () => {
  const [searchInput, setSearchInput] = useState("");
  const flatpakStore = useFlatpakAppsStore();

  useEffect(() => {
    const setInitialStates = async () => {
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
    <Layout>
      <div>
        <Spinner
          active={flatpakStore.state.apps.size == 0}
          disableSpinner={flatpakStore.state.apps.size == 0}
        />

        <h1 className="m-4 text-3xl font-extrabold leading-none tracking-tight text-white">
          Applications
        </h1>

        <SearchBar className="m-4" onChange={handleSearchChange} />

        <div className="grid grid-cols-2 m-4 gap-4 content-start">
          {[...flatpakStore.state.apps.values()]
            .filter(
              (app) =>
                app.is_installed &&
                app.name.toLowerCase().includes(searchInput.toLowerCase())
            )
            .slice(0, 100)
            .map((app, idx) => (
              <div key={idx}>
                <AppCard app={app} />
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};
