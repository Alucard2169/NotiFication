import { FC } from "react";
import { AiOutlineGlobal, AiFillGithub } from "react-icons/ai";
import { BiGitRepoForked } from "react-icons/bi";
import { FiStar } from "react-icons/fi";

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
  latest_download_url: string;
  latest_release_number: string;
  latest_release_published_at: string;
  latest_stable_release_number: string;
  latest_stable_release_published_at: string;
  license_normalized: boolean;
  licenses: string;
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

interface contextProps {
  platform: string;
  name: string;
}

interface TechnologyProps {
  techData: TechData;
}

const Technology: FC<TechnologyProps> = ({ techData }) => {
  const addCommasToNumber = (number: number): string => {
    return number.toLocaleString();
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
  } = techData;
  return (
    <div className="py-4 px-8 flex gap-8">
      <div className="w-1/2">
        <section className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <h1 className="text-3xl text-white bg-PRIMARY p-2 rounded-md w-fit font-bold">
              {name}
            </h1>{" "}
            {homepage && (
              <a href={homepage} target="_blank">
                <AiOutlineGlobal className="text-blue-500 text-2xl" />
              </a>
            )}
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
          <p className="text-lg text-white font-bold">
            Platform:{" "}
            <span className="text-COMPONENT_BG font-semibold">{platform}</span>
          </p>
          <p className="text-lg text-white font-bold">
            Rank:{" "}
            <span className="text-COMPONENT_BG font-semibold">{rank}</span>
          </p>
        </section>

        <ul className="flex gap-4 bg-PRIMARY p-2 w-fit rounded-md mt-2 items-center">
          {repository_url && (
            <li>
              <a href={repository_url} target="_blank">
                <AiFillGithub className="text-3xl text-COMPONENT_BG" />
              </a>
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
      </div>
      <div className="w-1/2 bg-PRIMARY rounded-md p-4">
        <p>Version</p>
      </div>
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
