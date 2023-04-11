import { useEffect, useState } from "react";
import { FlatpakApp } from "../models/flatpakApp";
import { Link } from "react-router-dom";

export const App = () => {
  const [versionMessage, setVersionMessage] =
    useState<string>("Loading version...");
  const [installedApps, setInstalledApps] = useState<FlatpakApp[]>([]);

  useEffect(() => {
    const setInitialStates = async () => {
      setVersionMessage(await window.versions.flatpak());
      setInstalledApps(await window.flatpak.getInstalledApps());
    };

    setInitialStates();
  }, []);

  return (
    <div>
      <Link to={"/remote_list"}>Go To Remote</Link>
      <h1>{versionMessage}</h1>
      {installedApps.map((app, idx) => (
        <div key={idx} className="bg-gray-500 text-center text-white">
          <Link to={"/app"} state={{ app: app, back_url: "/" }}>
            {app.name}
          </Link>
        </div>
      ))}
    </div>
  );
};
