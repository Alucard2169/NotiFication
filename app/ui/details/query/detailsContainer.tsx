"use client"

import Description from "@/app/ui/details/query/desciption";
import Releases from "@/app/ui/details/query/releases";
import Stats from "@/app/ui/details/query/stats";
import Topbar from "@/app/ui/details/query/topbar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AlertBox from "../../alertDialog";
import { Loading } from "../../loading";
import VersionChart from "./versionGraph";
// import VersionSection from "./versionGraph";


interface DataProps {
  name: string;
  contributions_count: number;
  forks: number;
  homepage: string;
  keywords: string[];
  language: string;
  latest_download_url: string;
  latest_release_number: string;
  latest_release_published_at: string;
  latest_stable_release_number: string;
  latest_stable_release_published_at: string;
  licenses: string;
  package_manager_url: string;
  rank: number;
  stars: number;
  repository_url: string;
  description: string;
  platform: string;
  versions: VersionProps[]
}


export interface VersionProps {
  number: string;
  published_at: string;
  spdx_expression: string;
  original_license: string;
  researched_at: string | null;
  repository_sources: string[];
}

const Details = () => {

  const {platform, query}: { platform: string;  query: string} = useParams()
  const [data, setData] = useState<DataProps | null>(null);
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchData = async (platform: string, query: string) => {
    try {
      const key = process.env.NEXT_PUBLIC_API_KEY;
      if (!key) throw new Error("API key is not set");
      setIsLoading(true)
      const response = await fetch(
        `https://libraries.io/api/${encodeURIComponent(platform)}/${encodeURIComponent(
          query
        )}?api_key=${key}`
      );


      

      if (!response.ok) {
        // Handle HTTP errors
        const error = await response.text();
        throw new Error(error);
        
      }

      const data = await response.json();
      setData(data)
      setIsLoading(false);
    } catch (error: any) {
      // Type check for error handling
      console.log(error)
      if (error instanceof Error) {
        setError(error.message)
        setIsLoading(false);
      }

      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  }
      
      useEffect(() => {
        fetchData(platform,query)
      },[platform,query])


  if (error) {
    return (
      <AlertBox
        status="error"
        title="Response Error"
        description={`${error} request`}
      />
    );
}
  
  if (isLoading) {
    return <Loading/>
  }

  return (
    <div className="sm:pt-[4%] pt-[15%]">
      {data && (
        <>
          <Topbar
            name={data.name}
            links={{
              latest_download_url: data.latest_download_url,
              repository_url: data.repository_url,
              package_manager_url: data.package_manager_url,
              homepage: data.homepage,
            }}
          />
          <div className="grid grid-rows-2 sm:grid-cols-2 gap-2 w-full">
            <div className="w-full">
              <Description
                data={{
                  language: data.language,
                  description: data.description,
                  keywords: data.keywords,
                }}
              />
              <Stats
                data={{
                  rank: data.rank,
                  stars: data.stars,
                  forks: data.forks,
                  contrib: data.contributions_count,
                  platform: data.platform,
                  license: data.licenses,
                }}
              />
              <Releases
                data={{
                  stable: data.latest_stable_release_number,
                  stable_date: data.latest_stable_release_published_at,
                  latest: data.latest_release_number,
                  latest_date: data.latest_release_published_at,
                }}
              />
            </div>
            <div className="w-full  mt-4 sm:mt-0 sm:border-l-2 border-red-500 p-2">
              <VersionChart versions={data.versions} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Details;