import { Link } from "react-router-dom";
import { useFlatpakAppsStore } from "../storage/flatpakAppsStorage";

export const RemoteFlatpakAppsView = () => {
  const flatpakStore = useFlatpakAppsStore();

  return (
    <div>
      <Link to={"/"}>Go To Installed</Link>
      {[...flatpakStore.state.apps.values()].map((app, idx) => (
        <div key={idx} className="bg-gray-500 text-center text-white">
          <Link to={"/app"} state={{ app: app, back_url: "/remote_list" }}>
            {app.name}
          </Link>
        </div>
      ))}
    </div>
  );
};
