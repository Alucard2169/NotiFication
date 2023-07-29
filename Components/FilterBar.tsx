import { useState } from "react";

const FilterBar = ({
  handleSort,
  loadingState
}: {
    handleSort: (sortBy: string) => void;
    loadingState: boolean;
}) => {
  const [sortDisplay, setSortDisplay] = useState<boolean>(false);

  const handleSortDisplay = () => {
    setSortDisplay(!sortDisplay);
  };
  return (
    <div className="bg-PRIMARY  w-5/6 mx-auto p-2 rounded-lg">
      <ul className="flex w-full gap-10">
        <li className="text-white font-bold cursor-pointer hover:bg-white hover:text-PRIMARY transition-all duration-200 rounded-md px-1">
          Filter
        </li>
        <li className="relative text-white font-bold cursor-pointer ">
          <span
            className="hover:bg-white hover:text-PRIMARY transition-all duration-200  rounded-md px-1"
            onClick={handleSortDisplay}
          >
            Sort By
          </span>
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
                handleSort("dependents count");
                handleSortDisplay();
              }}
              className="text-MAIN font-bold px-1 rounded-md hover:text-white hover:bg-MAIN transition-all duration-200"
            >
              Dependents Count
            </li>
            <li
              onClick={() => {
                handleSort("dependents_repo_count");
                handleSortDisplay();
              }}
              className="text-MAIN font-bold px-1 rounded-md hover:text-white hover:bg-MAIN transition-all duration-200"
            >
              Dependents Repos Count
            </li>
            <li
              onClick={() => {
                handleSort("latest_publish_at");
                handleSortDisplay();
              }}
              className="text-MAIN font-bold px-1 rounded-md hover:text-white hover:bg-MAIN transition-all duration-200"
            >
              Latest Release Published At
            </li>
            <li
              onClick={() => {
                handleSort("contribution_count");
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