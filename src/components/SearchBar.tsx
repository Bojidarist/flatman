import { AiOutlineSearch } from "react-icons/ai";

interface SearchBarParams {
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  className?: string;
}

export const SearchBar = (props: SearchBarParams) => {
  return (
    <div className={props.className}>
      <form>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <AiOutlineSearch className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-1 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 !outline-none"
            placeholder="Search"
            onChange={props.onChange}
          />
        </div>
      </form>
    </div>
  );
};
