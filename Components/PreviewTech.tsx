import { FC, useState } from "react";
import { FiGlobe, FiStar, FiPackage } from "react-icons/fi";
import { AiFillGithub, AiFillInfoCircle } from "react-icons/ai";
import Link from "next/link";

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

interface PreviewProps {
  data: TechData[];
}

const PreviewTech: FC<PreviewProps> = ({ data }) => {
  const addCommasToNumber = (number: number): string => {
    return number.toLocaleString();
  };

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-y-8 gap-x-4">
      {data.map((tech, i) => (
        <div className="p-2 rounded-md flex flex-col gap-2 w-96 bg-PRIMARY">
          <h1 className="bg-MAIN rounded-lg w-fit p-2 text-COMPONENT_BG font-semibold text-xl">
            {tech.name}
          </h1>
          <div className="bg-MAIN rounded-lg p-2 flex flex-col gap-4 h-full justify-between">
            <p className="text-white text-md font-semibold">
              {tech.description}
            </p>
            <ul className="bg-COMPONENT_BG flex gap-4 p-2 rounded-md">
              <li>
                <a
                  href={tech.repository_url}
                  title="github repo link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillGithub className="text-blue-500 bg-MAIN p-1 rounded-md text-4xl" />
                </a>
              </li>
              <li>
                <a
                  href={tech.homepage}
                  title="homepage"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiGlobe className="text-blue-500 bg-MAIN p-1 rounded-md text-4xl" />
                </a>
              </li>
              <li>
                <a
                  href={tech.package_manager_url}
                  title="package link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiPackage className="text-blue-500 bg-MAIN p-1 rounded-md text-4xl" />
                </a>
              </li>
              <li className="text-blue-500 bg-MAIN p-1 rounded-md flex gap-2 items-center">
                <FiStar className="text-2xl" />{" "}
                <span className="text-md text-COMPONENT_BG font-semibold">
                  {addCommasToNumber(tech.stars)}
                </span>
              </li>
              <li>
                <Link href={`/technology/${tech.platform}/${tech.name}`}>
                  <AiFillInfoCircle
                    className="text-white bg-MAIN p-1 rounded-md text-4xl"
                    title="view details"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PreviewTech;
