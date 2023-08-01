import { Version } from "@/types/techInterface";
import React, { useState } from "react";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";

const VersionChart: React.FC<{ versions: Version[] }> = ({ versions }) => {
  const [isAscending, setIsAscending] = useState(true);
  const [visibleVersion, setVisibleVersions] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const toggleOrder = () => {
    setIsAscending(!isAscending);
  };

  const sortedVersions = isAscending
    ? [...versions].sort(
        (a, b) =>
          new Date(a.published_at).getTime() -
          new Date(b.published_at).getTime()
      )
    : [...versions].sort(
        (a, b) =>
          new Date(b.published_at).getTime() -
          new Date(a.published_at).getTime()
      );

  const filteredVersions = sortedVersions.filter((version) =>
    version.number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const truncatedVersions = filteredVersions.slice(0, visibleVersion);

  const handleViewMoreVersions = (): void => {
    setVisibleVersions(filteredVersions.length);
  };

  const handleViewLessVersions = (): void => {
    setVisibleVersions(6);
  };

  const formattedDate = (dateString: string): string => {
    const formattedDate = new Date(dateString).toLocaleString();
    return formattedDate;
  };

  return (
    <div className="relative w-full sm:w-1/2 bg-MAIN rounded-md p-4">
      <div className="flex w-full justify-between items-center">
        <h3 className="text-white font-semibold text-2xl">
          Version{" "}
          <span className="text-COMPONENT_BG font-semibold text-lg">
            ({versions.length})
          </span>
        </h3>
        <button onClick={toggleOrder} className="text-MAIN mt-4">
          {isAscending ? (
            <BiUpArrow className="text-COMPONENT_BG bg-PRIMARY p-1 rounded-md text-3xl" />
          ) : (
            <BiDownArrow className="text-COMPONENT_BG bg-PRIMARY p-1 rounded-md text-3xl" />
          )}
        </button>
      </div>
      <input
        type="text"
        placeholder="Search version"
        value={searchTerm}
        onChange={handleSearch}
        className="absolute top-16 sm:top-20 right-4 bg-PRIMARY text-COMPONENT_BG font-semibold px-2 py-1 rounded-md mt-4 placeholder:text-black-700 outline-none focus:outline-white"
      />
      <div className="grid gap-2  mt-20 sm:mt-4">
        {truncatedVersions.map((version) => (
          <div
            key={version.number}
            className="bg-MAIN border border-PRIMARY py-1 px-2 rounded-md w-full sm:w-1/2 flex flex-col gap-2"
          >
            <h5 className="text-white font-semibold text-md">
              {version.number}
            </h5>
            <p className="text-MAIN bg-PRIMARY p-1 rounded-md font-bold text-sm">
              Published At:{" "}
              <span className="text-PRIMARY bg-MAIN p-1 rounded-md">
                {formattedDate(version.published_at)}
              </span>
            </p>
          </div>
        ))}
      </div>
      {visibleVersion < filteredVersions.length && (
        <button
          onClick={handleViewMoreVersions}
          className="bg-PRIMARY p-2 mt-2  w-full sm:w-1/2 rounded-md text-MAIN font-semibold"
        >
          View More
        </button>
      )}
      {visibleVersion === filteredVersions.length && (
        <button
          onClick={handleViewLessVersions}
          className="bg-PRIMARY p-2 mt-2 w-1/2 rounded-md text-MAIN font-semibold"
        >
          View Less
        </button>
      )}
    </div>
  );
};

export default VersionChart;
