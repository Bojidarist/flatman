import { useEffect, useState } from "react";
import { FlatpakApp } from "../models/flatpakApp";
import { Link } from "react-router-dom";

export const RemoteFlatpakAppsView = () => {
  const [remoteApps, setRemoteApps] = useState<FlatpakApp[]>([]);

  useEffect(() => {
    const setInitialStates = async () => {
      setRemoteApps(await window.flatpak.getRemoteApps());
    };

    setInitialStates();
  }, []);

  return (
    <div>
      <Link to={"/"}>Go To Installed</Link>
      {remoteApps.map((app, idx) => (
        <div key={idx} className="bg-gray-500 text-center text-white">
          <Link to={"/app"} state={{ app: app, back_url: "/remote_list" }}>
            {app.name}
          </Link>
        </div>
      ))}
    </div>
  );
};
