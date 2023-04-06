import * as ReactDOMClient from "react-dom/client";
import { App } from "./components/App";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { FlatpakAppView } from "./components/FlatpakAppView";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/app",
    element: <FlatpakAppView />,
  },
]);

const container = document.getElementById("app");
const root = ReactDOMClient.createRoot(container);

root.render(<RouterProvider router={router} />);
