import { ReactNode } from "react";
import { AiFillHome, AiFillCompass, AiFillSetting } from "react-icons/ai";
import { BiSolidDownload } from "react-icons/bi";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = (props: LayoutProps) => {
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
                    className="text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100"
                  >
                    <AiFillHome className="h-8 w-8" />
                  </Link>
                </div>

                <div className="pt-4">
                  <Link
                    to="/remote_list"
                    className="text-blue-500 transition-colors duration-200 bg-blue-100 rounded-lg dark:text-blue-400 dark:bg-gray-800"
                  >
                    <AiFillCompass className="h-8 w-8" />
                  </Link>
                </div>
                <div className="pt-4">
                  <Link
                    to="/"
                    className="text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100"
                  >
                    <BiSolidDownload className="h-8 w-8" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-auto">
              <Link
                to="/"
                className="text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100"
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
