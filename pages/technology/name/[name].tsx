import FilterBar from "@/Components/FilterBar";
import TechCard from "@/Components/TechCard";
import { FC, useState } from "react";

interface TechData {
  contributions_count: number;
  dependent_repos_count: number;
  dependents_count: number;
  deprecation_reason: null | string;
  description: string;
  forks: number;
  homepage: string;
  keywords: string[];
  language: string;
  latest_download_url: string;
  latest_release_number: string;
  latest_release_published_at: string;
  latest_stable_release_number: string;
  latest_stable_release_published_at: string;
  license_normalized: boolean;
  licenses: string;
  name: string;
  normalized_licenses: string[];
  package_manager_url: string;
  platform: string;
  rank: number;
  repository_license: string;
  repository_status: null | string;
  repository_url: string;
  stars: number;
  status: null | string;
  versions: Version[];
}

interface Version {
  number: string;
  published_at: string;
  spdx_expression: string;
  original_license: string;
  researched_at: null | string;
  repository_sources: string[];
}

interface TechProps {
  techData: TechData[];
  name: string;
}

const SearchResult: FC<TechProps> = ({ techData, name }) => {
  const [data, setData] = useState<TechData[]>(techData);
  const [showAll, setShowAll] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const handleViewMore = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_LIB_API_KEY;
      setIsLoading(true);
      const techResponse = await fetch(
        `https://libraries.io/api/search?q=${name}&api_key=${apiKey}`
      );
      const techData = await techResponse.json();

      setData(techData);
      setIsLoading(false);
      setShowAll(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative w-screen h-ch mt-8 sm:mt-8">
      <FilterBar/>
      {data.length === 0 ? (
        <p className="text-center  p-8  text-COMPONENT_BG font-semibold text-3xl">
          No Data
        </p>
      ) : (
        <div className="relative grid lg:grid-cols-3  p-2 sm:p-8 gap-8 md:grid-cols-2 sm:grid-cols-1">
          {data.map((tech, i) => (
            <TechCard tech={tech} key={i} />
          ))}
          {!showAll && (
            <button
              onClick={handleViewMore}
              className={`${
                isLoading
                  ? "pointer-events-none opacity-50 cursor-not-allowed"
                  : "pointer-events-auto"
              } absolute text-MAIN font-semibold text-3xl w-fit -bottom-12  sm:-bottom-8 left-0 right-0 mx-auto bg-COMPONENT_BG px-2 py-1 rounded-md`}
            >
              {isLoading ? "Loading" : "View More"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResult;

export async function getServerSideProps(context: any) {
  const { name } = context.query;

  try {
    const apiBaseUrl = "https://libraries.io/api";
    const apiKey = process.env.NEXT_PUBLIC_LIB_API_KEY;

    const techResponse = await fetch(
      `${apiBaseUrl}/search?q=${name}&api_key=${apiKey}&per_page=6`
    );
    const techData = await techResponse.json();

    return {
      props: {
        techData,
        name,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
}
