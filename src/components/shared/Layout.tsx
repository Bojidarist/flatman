import { ReactNode } from "react";
import { AiFillHome, AiFillCompass, AiFillSetting } from "react-icons/ai";
import { BiSolidDownload } from "react-icons/bi";
import { Link } from "react-router-dom";
import { ActionType } from "../../storage/flatpakAppsReducer";
import { useFlatpakAppsStore } from "../../storage/flatpakAppsStorage";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = (props: LayoutProps) => {
  const flatpakStore = useFlatpakAppsStore();

  const handleTabChange = (tab: string): void => {
    flatpakStore.dispatch({type: ActionType.SET_SELECTED_TAB, payload: tab});
  }

  return (
    <>
      <div className="relative md:flex h-screen overflow-hidden">
        <aside className="flex">
          <div className="flex flex-col items-center w-12 h-screen py-4 space-y-8 bg-white dark:bg-gray-900 dark:border-gray-700">
            <div className="mb-auto">
              <div>
                <div className="pt-2">
                  <Link
                    to="/"
                    onClick={() => {handleTabChange("/")}}
                    className={(flatpakStore.state.selectedTab == "/" ? "text-blue-500" : "text-gray-500") + " focus:outline-nones transition-colors duration-200 rounded-lg"}
                  >
                    <AiFillHome className="h-8 w-8" />
                  </Link>
                </div>

                <div className="pt-4">
                  <Link
                    to="/remote_list"
                    onClick={() => {handleTabChange("/remote_list")}}
                    className={(flatpakStore.state.selectedTab == "/remote_list" ? "text-blue-500" : "text-gray-500") + " transition-colors duration-200 bg-blue-100 rounded-lg"}
                  >
                    <AiFillCompass className="h-8 w-8" />
                  </Link>
                </div>
                <div className="pt-4">
                  <Link
                    to="/updates"
                    onClick={() => {handleTabChange("/updates")}}
                    className={(flatpakStore.state.selectedTab == "/updates" ? "text-blue-500" : "text-gray-500") + " focus:outline-nones transition-colors duration-200 rounded-lg"}
                  >
                    <BiSolidDownload className="h-8 w-8" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-auto">
              <Link
                to="/settings"
                onClick={() => handleTabChange("/settings")}
                className={(flatpakStore.state.selectedTab == "/settings" ? "text-blue-500" : "text-gray-500") + " focus:outline-nones transition-colors duration-200 rounded-lg"}
              >
                <AiFillSetting className="h-8 w-8" />
              </Link>
            </div>
          </div>
        </aside>
        <main className="flex-1 h-screen overflow-y-auto bg-white dark:bg-gray-800">
          {props.children}
        </main>
      </div>
    </>
  );
};
