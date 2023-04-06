import { useLocation } from "react-router-dom";
import { FlatpakApp } from "../models/flatpakApp";
import { Link } from "react-router-dom";

export const FlatpakAppView = () => {
  const app = useLocation().state as FlatpakApp;
  return (
    <div>
      <h1>
        <Link to="/">{"<"}</Link>
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
    </div>
  );
};
