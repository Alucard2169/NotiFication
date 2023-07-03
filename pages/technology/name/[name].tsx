import TechCard from "@/Components/TechCard";
import { FC } from "react";

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
}

const SearchResult: FC<TechProps> = ({ techData }) => {
  return (
    <div className="grid grid-cols-3 p-8 gap-8">
      {techData.map((tech, i) => (
        <TechCard tech={tech} key={i} />
      ))}
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
      `${apiBaseUrl}/search?q=${name}&api_key=${apiKey}`
    );
    const techData = await techResponse.json();

    return {
      props: {
        techData,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
}
