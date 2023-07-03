import { FC } from "react";
import {
  AiOutlineGlobal,
  AiFillGithub,
  AiOutlineDownload,
} from "react-icons/ai";
import { BiGitRepoForked, BiPackage } from "react-icons/bi";
import { FiStar } from "react-icons/fi";
import { BsFillPeopleFill } from "react-icons/bs";
import VersionChart from "@/Components/VersionChart";
import { version } from "os";
import { versions } from "process";

interface TechData {
  contributions_count: number;
  dependent_repos_count: number;
  dependents_count: number;
  deprecation_reason: null | string;
  description: string; //done
  forks: number; //done
  homepage: string; //done
  keywords: string[]; //done
  language: string; //done
  latest_download_url: string; //done
  latest_release_number: string; //done
  latest_release_published_at: string; //done
  latest_stable_release_number: string; //done
  latest_stable_release_published_at: string; //done
  license_normalized: boolean;
  licenses: string; //done
  name: string; //done
  normalized_licenses: string[];
  package_manager_url: string;
  platform: string; //done
  rank: number; //done
  repository_license: string;
  repository_status: null | string;
  repository_url: string; //done
  stars: number; //done
  status: null | string;
  versions: versions[];
}

interface versions {
  number: string;
  published_at: string;
  spdx_expression: string;
  original_license: string;
  researched_at: null | string;
  repository_sources: string[];
}

interface TechnologyProps {
  techData: TechData;
}

const Technology: FC<TechnologyProps> = ({ techData }) => {
  const addCommasToNumber = (number: number): string => {
    return number.toLocaleString();
  };

  const formattedDate = (dateString: string): string => {
    const formattedDate = new Date(dateString).toLocaleString();

    return formattedDate;
  };

  const {
    name,
    language,
    homepage,
    description,
    keywords,
    platform,
    rank,
    repository_url,
    forks,
    stars,
    licenses,
    latest_release_number,
    latest_release_published_at,
    latest_stable_release_number,
    latest_stable_release_published_at,
    latest_download_url,
    contributions_count,
    package_manager_url,
    versions,
  } = techData;
  return (
    <div className="py-4 px-8 flex gap-8">
      <div className="w-1/2">
        <section className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <h1 className="text-3xl text-white bg-PRIMARY p-2 rounded-md w-fit font-bold">
              {name}
            </h1>{" "}
            <div className="flex gap-4 items-center">
              {homepage && (
                <a href={homepage} target="_blank">
                  <AiOutlineGlobal className="text-blue-500 text-2xl" />
                </a>
              )}
              {repository_url && (
                <a href={repository_url} target="_blank">
                  <AiFillGithub className="text-3xl text-COMPONENT_BG" />
                </a>
              )}
              {latest_download_url && (
                <a href={latest_download_url} target="_blank">
                  <AiOutlineDownload className="text-blue-500 text-3xl" />
                </a>
              )}
              {package_manager_url && (
                <a href={package_manager_url} target="_blank">
                  <BiPackage className="text-blue-500 text-3xl" />
                </a>
              )}
            </div>
          </div>
          <span className="bg-PRIMARY p-2 rounded-md font-semibold w-fit text-COMPONENT_PRIMARY_BG">
            {language}
          </span>
          <article className="text-lg text-white font-bold flex flex-col gap-2 bg-PRIMARY p-2 rounded-md w-fit">
            <h2>Description:</h2>{" "}
            <p className="text-COMPONENT_BG font-semibold">{description}</p>
          </article>
          <article className="flex flex-col gap-2 bg-PRIMARY p-2 rounded-md w-full">
            <h2 className="text-white font-bold font-bold text-lg">
              Keywords:
            </h2>
            <div className="flex gap-2 flex-wrap">
              {keywords.map((key, i) => (
                <p
                  key={i}
                  className="bg-MAIN text-white w-fit rounded-md py-1 px-2 text-md font-semibold"
                >
                  {key}
                </p>
              ))}
            </div>
          </article>
          <ul className="flex gap-4 bg-PRIMARY p-2 w-fit rounded-md mt-2 items-center">
            {contributions_count && (
              <li className="bg-MAIN p-2 rounded-md flex gap-2 items-center text-white font-semibold">
                <BsFillPeopleFill className="text-3xl text-COMPONENT_BG" />
                {addCommasToNumber(contributions_count)}
              </li>
            )}
            <li className="bg-MAIN p-2 rounded-md flex gap-2 items-center text-white font-semibold">
              <BiGitRepoForked className="text-3xl text-COMPONENT_BG" />{" "}
              {addCommasToNumber(forks)}
            </li>
            <li className="bg-MAIN p-2 rounded-md flex gap-2 items-center text-white font-semibold">
              <FiStar className="text-3xl text-COMPONENT_BG" />
              {addCommasToNumber(stars)}
            </li>
            <li className="bg-MAIN p-2 rounded-md flex gap-2 items-center text-white font-semibold">
              License: <span className="text-COMPONENT_BG">{licenses}</span>
            </li>
          </ul>
          <p className="text-lg text-white font-bold">
            Platform:{" "}
            <span className="text-COMPONENT_BG font-semibold">{platform}</span>
          </p>
          <p className="text-lg text-white font-bold">
            Rank:{" "}
            <span className="text-COMPONENT_BG font-semibold">{rank}</span>
          </p>
        </section>

        <ul className="mt-4 flex flex-col gap-3">
          <h3 className="text-white font-bold text-2xl">Releases:</h3>
          <li className="bg-PRIMARY w-full flex flex-col gap-2 p-1 rounded-md">
            <p className="text-white font-semibold text-md">
              Latest Stable Release Number:{" "}
              <span className="text-COMPONENT_BG py-1 px-2 bg-MAIN rounded-md">
                {latest_stable_release_number}
              </span>
            </p>
            <p className="text-white font-semibold text-md">
              Published At:{" "}
              <span className="text-COMPONENT_BG py-1 px-2 bg-MAIN rounded-md">
                {formattedDate(latest_stable_release_published_at)}
              </span>{" "}
            </p>
          </li>
          <li className="bg-PRIMARY w-full flex flex-col gap-2 p-1 rounded-md">
            <p className="text-white font-semibold text-md">
              Latest Release Number:{" "}
              <span className="text-COMPONENT_BG py-1 px-2 bg-MAIN rounded-md">
                {latest_release_number}
              </span>
            </p>
            <p className="text-white font-semibold text-md">
              Published At:{" "}
              <span className="text-COMPONENT_BG py-1 px-2 bg-MAIN rounded-md">
                {formattedDate(latest_release_published_at)}
              </span>{" "}
            </p>
          </li>
        </ul>
      </div>
      <VersionChart versions={versions} />
    </div>
  );
};

export default Technology;

export async function getServerSideProps(context: any) {
  const { platform, name } = context.query;
  try {
    const apiBaseUrl = "https://libraries.io/api";
    const apiKey = process.env.NEXT_PUBLIC_LIB_API_KEY;
    const techResponse = await fetch(
      `${apiBaseUrl}/${platform}/${name}?api_key=${apiKey}`
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
