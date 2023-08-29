import { Link } from "react-router-dom";
import { useFlatpakAppsStore } from "../storage/flatpakAppsStorage";
import { useState } from "react";
import { Layout } from "./shared/Layout";
import { SearchBar } from "./SearchBar";
import { AppCard } from "./AppCard";

export const RemoteFlatpakAppsView = () => {
  const flatpakStore = useFlatpakAppsStore();
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value);
  };

  return (
    <Layout>
      <div>
        <SearchBar className="m-4" onChange={handleSearchChange} />
        <div className="grid grid-cols-2 m-4 gap-4 content-start">
          {[...flatpakStore.state.apps.values()]
            .filter((app) =>
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
