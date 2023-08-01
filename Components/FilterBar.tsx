import { FC, useState } from "react";
import SortMenu from "./SortMenu";

interface FilterBarProps {
  handleSort: (sortBy: string) => void;
  handleFilter: (filter: string) => void;
  loadingState: boolean;
}


const FilterBar: FC<FilterBarProps> = ({
  handleSort,
  loadingState,
}) => {
  const [sortDisplay, setSortDisplay] = useState<boolean>(false);
  const [sortType, setSortType] = useState<string>("Default");


  const handleSortDisplay = () => {
    setSortDisplay(!sortDisplay);
  };
  return (
    <div className="bg-PRIMARY  w-5/6 mx-auto p-2 rounded-lg">
      <ul className="flex w-full gap-10">
        <li className="relative  ">
          <span
            className="text-MAIN font-bold cursor-pointer  rounded-md px-1"
            onClick={handleSortDisplay}
          >
            Sort By
          </span>
          <span
            className="text-PRIMARY bg-MAIN p-1 rounded-md font-bold cursor-pointer"
            onClick={handleSortDisplay}
          >
            {loadingState ? "..." : sortType}
          </span>
          <SortMenu
            sortDisplay={sortDisplay}
            handleSort={handleSort}
            handleSortDisplay={handleSortDisplay}
            handleSortType={setSortType}
          />
        </li>
        <li className="ml-auto">
          {loadingState ? (
            <span className=" text-white   font-semibold">loading...</span>
          ) : null}
        </li>
      </ul>
    </div>
  );
};
 
export default FilterBar;