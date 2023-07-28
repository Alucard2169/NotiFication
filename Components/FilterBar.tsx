import { useState } from "react";

const FilterBar = () => {

  const [sortDisplay, setSortDisplay] = useState<boolean>(false)
  

  const handleSortDisplay = () => {
    setSortDisplay(!sortDisplay)
  }
    return (
      <div className="bg-PRIMARY  w-5/6 mx-auto p-2 rounded-lg">
        <ul className="flex gap-10">
          <li className="text-white font-bold cursor-pointer hover:bg-white hover:text-PRIMARY transition-all duration-200 rounded-md px-1">
            Filter
          </li>
          <li className="relative text-white font-bold cursor-pointer ">
            <span className="hover:bg-white hover:text-PRIMARY transition-all duration-200  rounded-md px-1" onClick={handleSortDisplay}>
              Sort By
            </span>
            <ul className={`${!sortDisplay ? 'hidden':null} absolute bg-PRIMARY p-1 z-50 top-10 rounded-md w-56 pl-2 flex flex-col gap-4`}>
              <li className="text-MAIN font-bold px-1 rounded-md hover:text-white hover:bg-MAIN transition-all duration-200">Rank</li>
              <li className="text-MAIN font-bold px-1 rounded-md hover:text-white hover:bg-MAIN transition-all duration-200">Stars</li>
              <li className="text-MAIN font-bold px-1 rounded-md hover:text-white hover:bg-MAIN transition-all duration-200">Dependents Count</li>
              <li className="text-MAIN font-bold px-1 rounded-md hover:text-white hover:bg-MAIN transition-all duration-200">Dependents Repos Count</li>
              <li className="text-MAIN font-bold px-1 rounded-md hover:text-white hover:bg-MAIN transition-all duration-200">Latest Release Published At</li>
              <li className="text-MAIN font-bold px-1 rounded-md hover:text-white hover:bg-MAIN transition-all duration-200">Contributions Count</li>
              <li className="text-MAIN font-bold px-1 rounded-md hover:text-white hover:bg-MAIN transition-all duration-200">Created At</li>
            </ul>
          </li>
        </ul>
      </div>
    );
}
 
export default FilterBar;