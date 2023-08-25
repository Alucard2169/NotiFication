import { FC } from "react";

interface SortMenuProps {
    sortDisplay: boolean;
      handleSort: (sortBy: string) => void;
  handleSortDisplay: () => void;
  handleSortType: (sortType: string) => void;
}

const SortMenu: FC<SortMenuProps> = ({ sortDisplay, handleSort, handleSortDisplay,handleSortType }) => {
 
    return (
      <ul
        className={`${
          !sortDisplay ? "hidden" : null
        } absolute bg-PRIMARY p-1 z-50 top-10 rounded-md w-56 pl-2 flex flex-col gap-2`}
      >
        <li
          onClick={() => {
            handleSort("");
            handleSortDisplay();
            handleSortType('Default')
          }}
          className="text-NEUTRAL  font-bold px-4 py-2 text-sm rounded-md hover:text-white hover:bg-MAIN transition-all duration-200"
        >
          Default
        </li>
        <li
          onClick={() => {
            handleSort("rank");
            handleSortDisplay();
            handleSortType('Rank')
          }}
          className="text-NEUTRAL font-bold px-4 py-2 text-sm rounded-md hover:text-white hover:bg-MAIN transition-all duration-200"
        >
          Rank
        </li>
        <li
          onClick={() => {
            handleSort("stars");
            handleSortDisplay();
            handleSortType('Stars')
          }}
          className="text-NEUTRAL font-bold px-4 py-2 text-sm rounded-md hover:text-white hover:bg-MAIN transition-all duration-200"
        >
          Stars
        </li>
        <li
          onClick={() => {
            handleSort("dependents_count");
            handleSortDisplay();
            handleSortType('Dependents Count')
          }}
          className="text-NEUTRAL font-bold px-4 py-2 text-sm rounded-md hover:text-white hover:bg-MAIN transition-all duration-200"
        >
          Dependents Count
        </li>
        <li
          onClick={() => {
            handleSort("dependent_repos_count");
            handleSortDisplay();
            handleSortType('Dependents Repo Count')
          }}
          className="text-NEUTRAL font-bold px-4 py-2 text-sm rounded-md hover:text-white hover:bg-MAIN transition-all duration-200"
        >
          Dependents Repos Count
        </li>
        <li
          onClick={() => {
            handleSort("latest_release_published_at");
            handleSortDisplay();
            handleSortType('Latest Release Published At')
          }}
          className="text-NEUTRAL font-bold px-4 py-2 text-sm rounded-md hover:text-white hover:bg-MAIN transition-all duration-200"
        >
          Latest Release Published At
        </li>
        <li
          onClick={() => {
            handleSort("contributions_count");
            handleSortDisplay();
            handleSortType('Contributions Count')
          }}
          className="text-NEUTRAL font-bold px-4 py-2 text-sm rounded-md hover:text-white hover:bg-MAIN transition-all duration-200"
        >
          Contributions Count
        </li>
        <li
          onClick={() => {
            handleSort("created_at");
            handleSortDisplay();
            handleSortType('Created At')
          }}
          className="text-NEUTRAL font-bold px-4 py-2 text-sm rounded-md hover:text-white hover:bg-MAIN transition-all duration-200"
        >
          Created At
        </li>
      </ul>
    );
}
 
export default SortMenu;