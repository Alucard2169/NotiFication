"use client"

import {
  AiFillGithub,
  AiOutlineDownload,
  AiOutlineGlobal,
} from "react-icons/ai";
import { BiPackage } from "react-icons/bi";


interface TopbarProps {
  name: string;
  links: {
    homepage: string;
    repository_url: string;
    latest_download_url: string;
    package_manager_url: string;
  };
}

const Topbar = ({ name, links }: TopbarProps) => {

  const { homepage , repository_url, latest_download_url,package_manager_url} = links;


  return (
    <section className="flex justify-between">
      <h1 className="font-bold text-xl sm:text-2xl p-2  w-fit rounded-md text-NEUTRAL">
        {name}
      </h1>

      <aside className="flex gap-4 items-center">
        {homepage && (
          <a href={homepage} target="_blank" aria-label="homepage link">
            <AiOutlineGlobal className="text-blue-500  text-xl sm:text-2xl" />
          </a>
        )}

        {repository_url && (
          <a href={repository_url} target="_blank" aria-label="repository link">
            <AiFillGithub className="text-xl sm:text-2xl text-NEUTRAL" />
          </a>
        )}

        {latest_download_url && (
          <a
            href={latest_download_url}
            target="_blank"
            aria-label="download link"
          >
            <AiOutlineDownload className="text-blue-500 text-xl sm:text-2xl" />
          </a>
        )}

        {package_manager_url && (
          <a
            href={package_manager_url}
            target="_blank"
            aria-label="package manager link"
          >
            <BiPackage className="text-blue-500 text-xl sm:text-2xl" />
          </a>
        )}
      </aside>
    </section>
  );
};

export default Topbar;
