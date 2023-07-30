import { FC } from "react";

interface SortMenuProps {
    sortDisplay: boolean;
      handleSort: (sortBy: string) => void;
    handleSortDisplay: () => void;
}

const SortMenu: FC<SortMenuProps> = ({ sortDisplay, handleSort, handleSortDisplay }) => {
 
    return (
      <ul
        className={`${
          !sortDisplay ? "hidden" : null
        } absolute bg-PRIMARY p-1 z-50 top-10 rounded-md w-56 pl-2 flex flex-col gap-4`}
      >
        <li
          onClick={() => {
            handleSort("");
            handleSortDisplay();
          }}
          className="text-MAIN font-bold px-1 rounded-md hover:text-white hover:bg-MAIN transition-all duration-200"
        >
          Default
        </li>
        <li
          onClick={() => {
            handleSort("rank");
            handleSortDisplay();
          }}
          className="text-MAIN font-bold px-1 rounded-md hover:text-white hover:bg-MAIN transition-all duration-200"
        >
          Rank
        </li>
        <li
          onClick={() => {
            handleSort("stars");
            handleSortDisplay();
          }}
          className="text-MAIN font-bold px-1 rounded-md hover:text-white hover:bg-MAIN transition-all duration-200"
        >
          Stars
        </li>
        <li
          onClick={() => {
            handleSort("dependents_count");
            handleSortDisplay();
          }}
          className="text-MAIN font-bold px-1 rounded-md hover:text-white hover:bg-MAIN transition-all duration-200"
        >
          Dependents Count
        </li>
        <li
          onClick={() => {
            handleSort("dependent_repos_count");
            handleSortDisplay();
          }}
          className="text-MAIN font-bold px-1 rounded-md hover:text-white hover:bg-MAIN transition-all duration-200"
        >
          Dependents Repos Count
        </li>
        <li
          onClick={() => {
            handleSort("latest_release_published_at");
            handleSortDisplay();
          }}
          className="text-MAIN font-bold px-1 rounded-md hover:text-white hover:bg-MAIN transition-all duration-200"
        >
          Latest Release Published At
        </li>
        <li
          onClick={() => {
            handleSort("contributions_count");
            handleSortDisplay();
          }}
          className="text-MAIN font-bold px-1 rounded-md hover:text-white hover:bg-MAIN transition-all duration-200"
        >
          Contributions Count
        </li>
        <li
          onClick={() => {
            handleSort("created_at");
            handleSortDisplay();
          }}
          className="text-MAIN font-bold px-1 rounded-md hover:text-white hover:bg-MAIN transition-all duration-200"
        >
          Created At
        </li>
      </ul>
    );
}
 
export default SortMenu;