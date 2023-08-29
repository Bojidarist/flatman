import * as ReactDOMClient from "react-dom/client";
import { App } from "./components/App";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { FlatpakAppView } from "./components/FlatpakAppView";
import { RemoteFlatpakAppsView } from "./components/RemoteFlatpakAppsView";
import FlatpakAppStore from "./storage/flatpakAppsStorage";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/app",
    element: <FlatpakAppView />,
  },
  {
    path: "/remote_list",
    element: <RemoteFlatpakAppsView />,
  },
]);

const container = document.getElementById("app");
const root = ReactDOMClient.createRoot(container);

root.render(
  <FlatpakAppStore>
    <RouterProvider router={router} />
  </FlatpakAppStore>
);
