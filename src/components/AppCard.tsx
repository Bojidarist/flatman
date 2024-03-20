import { Link } from "react-router-dom";
import { FlatpakApp } from "../models/flatpakApp";

interface AppCardProps {
  app: FlatpakApp;
}

export const AppCard = (props: AppCardProps) => {
  return (
    <div className="h-32 max-h-32 overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
      <Link
        to={"/app"}
        className="cursor-pointer flex flex-col items-center bg-white shadow md:flex-row w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        state={{ app: props.app, back_url: "/" }}
      >
        <img
          className="object-cover rounded-t-lg h-32 w-32 md:rounded-none md:rounded-l-lg p-4"
          src={props.app.icon_url}
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {props.app.name}
          </h4>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {props.app.summary}
          </p>
        </div>
      </Link>
    </div>
  );
};
