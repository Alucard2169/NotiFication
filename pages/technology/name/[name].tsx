import FilterBar from "@/Components/FilterBar";
import TechCard from "@/Components/TechCard";
import { TechData } from "@/types/techInterface";
import { FC, useState } from "react";


interface TechProps {
  techData: TechData[];
  name: string;
}

const SearchResult: FC<{ techData: TechData[]; name: string }> = ({
  techData,
  name,
}) => {

  const [data, setData] = useState<TechData[]>(techData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>("");
  const [filterOptions, setFIlterOptions] = useState<string>("");


  const handleSortFunctionality = async (sortBy: string) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_LIB_API_KEY;
      setIsLoading(true);
      const techResponse = await fetch(
        `https://libraries.io/api/search?q=${name}&api_key=${apiKey}&sort=${sortBy}`
      );
      const techData = await techResponse.json();

      setData(techData);
      setIsLoading(false);
      setSortOption(sortBy); // Set the selected sorting option in state
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative w-screen h-ch mt-16 sm:mt-20">
      <FilterBar
        handleSort={handleSortFunctionality}
        handleFilter={setFIlterOptions}
        loadingState={isLoading}
      />
      {data && data.length === 0 ? (
        <p className="text-center  p-8  text-COMPONENT_BG font-semibold text-3xl">
          No Data
        </p>
      ) : (
        <div className="relative grid lg:grid-cols-3  p-2 sm:p-8 gap-8 md:grid-cols-2 sm:grid-cols-1">
          {data && data.map((tech, i) => <TechCard tech={tech} key={i} />)}
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
      `${apiBaseUrl}/search?q=${name}&api_key=${apiKey}&page=1&per_page=10`
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
