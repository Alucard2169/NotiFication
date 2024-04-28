import React, { useState } from "react";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import { VersionProps } from "./detailsContainer";
import { formatDate } from "./releases";
import { version } from "os";

const VersionChart: React.FC<{ versions: VersionProps[] }> = ({ versions }) => {
  const [isAscending, setIsAscending] = useState(true);
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredVersions, setFilteredVersions] = useState(versions);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm); 
    const newFilteredVersions = versions.filter((version) =>
      version.number.toLowerCase().includes(searchTerm) 
    );
    setFilteredVersions(newFilteredVersions); 
  };

  const toggleOrder = () => {
    setIsAscending(!isAscending);
  };

  const sortVersions = (versions: VersionProps[], isAscending: boolean) => {
    return [...versions].sort((a, b) =>
      isAscending
        ? new Date(a.published_at).getTime() -
          new Date(b.published_at).getTime()
        : new Date(b.published_at).getTime() -
          new Date(a.published_at).getTime()
    );
  };

 const sortedVersions = sortVersions(filteredVersions, isAscending);
  
  return (
    <div className="relative w-full bg-MAIN rounded-md sm:p-4">
      <div className="flex flex-col gap-4 sm:flex-row w-full justify-between sm:items-center">
        <h3 className="text-white font-semibold text-xl sm:text-2xl">
          Version{" "}
          <span className="text-COMPONENT_BG font-semibold text-lg">
            ({filteredVersions.length})
          </span>
        </h3>
        <input
          type="text"
          placeholder="Search version"
          onChange={handleSearch}
          value={searchTerm}
          className=" bg-MAIN text-NEUTRAL font-normal px-2 py-1 rounded-md  placeholder:text-black-700 outline-none focus:outline-white"
        />
        <button
          onClick={toggleOrder}
          className="text-NEUTRAL"
          aria-label="change order button"
        >
          {isAscending ? (
            <BiUpArrow className="text-NEUTRAL bg-PRIMARY p-1 rounded-md text-3xl" />
          ) : (
            <BiDownArrow className="text-NEUTRAL bg-PRIMARY p-1 rounded-md text-3xl" />
          )}
        </button>
      </div>

      <div className="grid gap-2 sm:gap-4 sm:grid-cols-2 max-h-[30rem] sm:max-h-[27rem] overflow-scroll scroll-smooth mt-8  border border-white-500 p-2 rounded-sm sm:border-none">
        {sortedVersions.map((version) => (
          <div
            key={version.number}
            className="bg-MAIN border border-PRIMARY py-1 px-2 rounded-sm sm:rounded-md w-full flex flex-col gap-4"
          >
            <h5 className="text-white font-semibold text-sm sm:text-md">
              {version.number}
            </h5>
            <p className="text-NEUTRAL bg-PRIMARY p-1 rounded-md font-bold text-xs sm:text-sm">
              Published At:{" "}
              <span className="text-NEUTRAL bg-MAIN p-1 rounded-md">
                {formatDate(version.published_at)}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VersionChart;
