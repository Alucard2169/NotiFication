import VersionChart from "@/Components/VersionChart";
import { TechData } from "@/types/techInterface";
import { FC } from "react";
import {
  AiFillGithub,
  AiOutlineDownload,
  AiOutlineGlobal,
} from "react-icons/ai";
import { BiGitRepoForked, BiPackage } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import { FiStar } from "react-icons/fi";


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
    <div className="py-4 px-4 sm:px-8 flex flex-col gap-8 sm:flex-row">
      <div className="w-full sm:w-1/2">
        <section className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <h1 className="text-3xl text-PRIMARY p-2 rounded-md w-fit font-bold">
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
          <span className="bg-PRIMARY p-2 rounded-md font-semibold w-fit text-MAIN">
            {language}
          </span>
          <article className="text-lg text-white font-bold flex flex-col gap-2 bg-PRIMARY p-2 rounded-md w-fit">
            <h2 className="text-MAIN">Description:</h2>{" "}
            <p className="text-PRIMARY bg-MAIN p-1 rounded-md font-semibold">{description}</p>
          </article>
          <article className="flex flex-col gap-2 bg-PRIMARY p-2 rounded-md w-full">
            <h2 className="text-MAIN font-bold text-lg">
              Keywords:
            </h2>
            <div className="flex gap-1 sm:gap-2 flex-wrap">
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
          <ul className="flex gap-4 bg-PRIMARY p-2 w-fit rounded-md mt-2 items-center flex-wrap">
            {contributions_count && (
              <li className="bg-MAIN p-1 sm:p-2 rounded-md flex gap-2 items-center text-white font-semibold">
                <BsFillPeopleFill className="text-lg sm:text-3xl text-COMPONENT_BG" />
                {addCommasToNumber(contributions_count)}
              </li>
            )}
            <li className="bg-MAIN p-1 sm:p-2 rounded-md flex gap-2 items-center text-white font-semibold">
              <BiGitRepoForked className="text-lg sm:text-3xl text-COMPONENT_BG" />{" "}
              {addCommasToNumber(forks)}
            </li>
            <li className="bg-MAIN p-1 sm:p-2 rounded-md flex gap-2 items-center text-white font-semibold">
              <FiStar className="text-lg sm:text-3xl text-COMPONENT_BG" />
              {addCommasToNumber(stars)}
            </li>
            <li className="bg-MAIN p-1 sm:p-2 rounded-md flex gap-2 items-center text-white font-semibold">
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
          <hr />
          <h3 className="text-white font-bold text-xl sm:text-2xl">
            Releases:
          </h3>
          <li className="bg-PRIMARY w-full flex flex-col gap-2 p-1 rounded-md">
            <p className="text-MAIN font-semibold text-md">
              Latest Stable Release Number:{" "}
              <span className="text-PRIMARY py-1 px-2 bg-MAIN rounded-md">
                {latest_stable_release_number}
              </span>
            </p>
            <p className="text-MAIN font-semibold text-md">
              Published At:{" "}
              <span className="text-PRIMARY py-1 px-2 bg-MAIN rounded-md">
                {formattedDate(latest_stable_release_published_at)}
              </span>{" "}
            </p>
          </li>
          <li className="bg-PRIMARY w-full flex flex-col gap-2 p-1 rounded-md">
            <p className="text-MAIN font-semibold text-md">
              Latest Release Number:{" "}
              <span className="text-PRIMARY py-1 px-2 bg-MAIN rounded-md">
                {latest_release_number}
              </span>
            </p>
            <p className="text-MAIN font-semibold text-md">
              Published At:{" "}
              <span className="text-PRIMARY py-1 px-2 bg-MAIN rounded-md">
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
