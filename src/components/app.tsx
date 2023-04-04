import { useEffect, useState } from "react";
import { FlatpakApp } from "../models/flatpakApp";

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
      <h1>{versionMessage}</h1>
      {installedApps.map((app, idx) => (
        <div key={idx} className="bg-gray-500 text-center text-white">
          {app.name}
        </div>
      ))}
    </div>
  );
};
