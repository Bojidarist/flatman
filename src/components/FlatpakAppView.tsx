import { useLocation } from "react-router-dom";
import { FlatpakApp } from "../models/flatpakApp";
import { Link } from "react-router-dom";

export const FlatpakAppView = () => {
  const viewState = useLocation().state as {
    app: FlatpakApp;
    back_url: string;
  };
  return (
    <div>
      <h1>
        <Link to={viewState.back_url}>{"<"}</Link>
      </h1>
      <h2>{viewState.app.name}</h2>
      <p>ID: {viewState.app.app_id}</p>
      <p>Version: {viewState.app.version}</p>
      <p>Branch: {viewState.app.branch}</p>
      <p>
        {viewState.app.is_installed
          ? "Application is installed!"
          : "Application is not installed!"}
      </p>
    </div>
  );
};
