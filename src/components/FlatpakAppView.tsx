import { FlatpakApp } from "../models/flatpakApp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFlatpakAppsStore } from "../storage/flatpakAppsStorage";
import { ActionType } from "../storage/flatpakAppsReducer";
import * as flathubService from "../services/flathubService";
import { Spinner } from "./shared/Spinner";
import { Layout } from "./shared/Layout";
import ImageGallery from "react-image-gallery";

export const FlatpakAppView = () => {
  const viewState = useLocation().state as {
    app: FlatpakApp;
    back_url: string;
  };
  const navigate = useNavigate();

  const [isInstalling, setIsInstalling] = useState<boolean>(false);
  const flatpakStore = useFlatpakAppsStore();
  let app = flatpakStore.state.apps.get(
    viewState.app.origin + "_" + viewState.app.app_id
  );

  useEffect(() => {
    const setInitialStates = async () => {
      if (app.origin == "flathub" && app.screenshots.length == 0) {
        app = await flathubService.getAppDetails(app);
        flatpakStore.dispatch({
          type: ActionType.SET_INSTALLED_APP,
          payload: app,
        });
      }
    };

    setInitialStates();
  }, []);

  const installAppBtnClick = async () => {
    setIsInstalling(true);
    await window.flatpak.manageApp(app);
    app.is_installed = !app.is_installed;
    flatpakStore.dispatch({
      type: ActionType.SET_INSTALLED_APP,
      payload: app,
    });
    setIsInstalling(false);
  };

  const openAppBtnClick = async () => {
    await window.flatpak.openApp(app);
  };

  return (
    <Layout>
      <div>
        <Spinner active={isInstalling} disableSpinner={isInstalling} />
        <div className="p-4">
          <Link
            to={".."}
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Go back
          </Link>
          <div>
            <img
              className="object-cover rounded-t-lg h-16 w-16 mr-2 md:rounded-none md:rounded-l-lg inline-block text-left"
              src={app.icon_url}
              alt=""
            />
            <p className="inline-block text-left mb-2 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
              {app.name}
            </p>
            <div className="inline-block float-right">
              {app.is_installed && (
                <button
                  className={
                    "inline-block text-white font-bold py-2 px-4 mr-4 rounded bg-blue-500 hover:bg-blue-700"
                  }
                  onClick={openAppBtnClick}
                  disabled={isInstalling}
                >
                  Open
                </button>
              )}
              <button
                className={
                  "inline-block text-white font-bold py-2 px-4 rounded " +
                  (app.is_installed
                    ? "bg-red-500 hover:bg-red-700"
                    : "bg-blue-500 hover:bg-blue-700")
                }
                onClick={installAppBtnClick}
                disabled={isInstalling}
              >
                {app.is_installed ? "Remove" : "Install"}
              </button>
            </div>
          </div>
          <p className="text-lg text-gray-400 my-2">{app.summary}</p>
          <div className="max-w-full bg-gray-900/20 rounded">
            <div className="container mx-auto max-w-6xl mt-4">
              <ImageGallery
                showThumbnails={false}
                showFullscreenButton={false}
                showPlayButton={false}
                autoPlay={true}
                items={app.screenshots.map(
                  (screenshoturl: string, idx: number) => ({
                    original: screenshoturl,
                  })
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
