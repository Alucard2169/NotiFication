import { FC, useState } from "react";
import FilterMenu from "./FilterMenu";
import SortMenu from "./SortMenu";

interface FilterBarProps {
  handleSort: (sortBy: string) => void;
  loadingState: boolean;
}


const FilterBar:FC<FilterBarProps> = ({
  handleSort,
  loadingState    
  }) => {
  
  
    const [filterDisplay, setFilterDisplay] = useState<boolean>(false);
  const [sortDisplay, setSortDisplay] = useState<boolean>(false);
    const [sortType,setSortType] = useState<string>('Default')
  
    


  const handleFilterDisplay = () => {
    setFilterDisplay(!filterDisplay);
  };
  const handleSortDisplay = () => {
    setSortDisplay(!sortDisplay)
  }
  return (
    <div className="bg-PRIMARY  w-5/6 mx-auto p-2 rounded-lg">
      <ul className="flex w-full gap-10">
        <li className="relative text-white font-bold cursor-pointer ">
          <span
            onClick={handleFilterDisplay}
            className="hover:bg-white hover:text-PRIMARY transition-all duration-200  rounded-md px-1"
          >
            Filter
          </span>
          <FilterMenu
            filterDisplay={filterDisplay}
            handleFilterDisplay={handleFilterDisplay}
          />
        </li>
        <li className="relative text-white font-bold cursor-pointer ">
          <span
            className="hover:bg-white hover:text-PRIMARY transition-all duration-200  rounded-md px-1"
            onClick={handleSortDisplay}
          >
            Sort By
          </span>
          <span className="text-PRIMARY bg-MAIN p-1 rounded-md font-bold cursor-auto">
            
            {loadingState ? '...' : sortType}
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
            <span className=" text-white font-semibold">loading...</span>
          ) : null}
        </li>
      </ul>
    </div>
  );
};
 
export default FilterBar;