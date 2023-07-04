import { Link } from "react-router-dom";
import { useFlatpakAppsStore } from "../storage/flatpakAppsStorage";
import { useState } from "react";

export const RemoteFlatpakAppsView = () => {
  const flatpakStore = useFlatpakAppsStore();
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value);
  };

  return (
    <div>
      <Link to={"/"}>Go To Installed</Link>

      <div>
        <input
          type="search"
          placeholder="Search"
          onChange={handleSearchChange}
          value={searchInput}
        ></input>
      </div>

      {[...flatpakStore.state.apps.values()]
        .filter((app) =>
          app.name.toLowerCase().includes(searchInput.toLowerCase())
        )
        .slice(0, 100)
        .map((app, idx) => (
          <div key={idx} className="bg-gray-500 text-center text-white">
            <Link to={"/app"} state={{ app: app, back_url: "/remote_list" }}>
              <img src={app.icon_url} width="32" height="32" />
              <p>{app.name}</p>
              <p>{app.summary}</p>
            </Link>
          </div>
        ))}
    </div>
  );
};
