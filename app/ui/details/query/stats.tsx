"use client"

import { FaCodeFork, FaRankingStar } from "react-icons/fa6";
import { GiFlatPlatform } from "react-icons/gi";
import { IoPeople } from "react-icons/io5";
import { RiStarSFill } from "react-icons/ri";
import { TbLicense } from "react-icons/tb";


interface StatsProps {
  rank: number,
  stars: number;
  forks: number;
  contrib: number;
  platform: string;
  license: string;
}


const Stats = ({ data }: { data: StatsProps }) => {

  const { rank, stars, forks, contrib, platform, license } = data;

  return (
    <section className="mt-8 ">
      <h4 className="text-blue-500 text-lg sm:text-xl font-bold">Stats</h4>
      <ul className="flex gap-4 mt-2 sm:pl-4 flex-wrap">
        {rank && (
          <li className="flex gap-2 items-center bg-NEUTRAL_BG p-1 sm:p-2 rounded-sm sm:rounded-md text-MAIN text-md sm:text-lg  font-bold">
            <FaRankingStar /> <span>{rank.toLocaleString()}</span>
          </li>
        )}

        {contrib && (
          <li className="flex gap-2 items-center bg-NEUTRAL_BG p-1 sm:p-2 rounded-sm sm:rounded-md text-MAIN text-md sm:text-lg  font-bold">
            <IoPeople />
            <span>{contrib.toLocaleString()}</span>
          </li>
        )}
        {forks && (
          <li className="flex gap-2 items-center bg-NEUTRAL_BG p-1 sm:p-2 rounded-sm sm:rounded-md text-MAIN text-md sm:text-lg  font-bold">
            <FaCodeFork />
            <span>{forks.toLocaleString()}</span>
          </li>
        )}
        {stars && (
          <li className="flex gap-2 items-center bg-NEUTRAL_BG p-1 sm:p-2 rounded-sm sm:rounded-md text-MAIN text-md sm:text-lg  font-bold">
            <RiStarSFill />
            <span>{stars.toLocaleString()}</span>
          </li>
        )}
        {license && (
          <li className="flex gap-2 items-center bg-NEUTRAL_BG p-1 sm:p-2 rounded-sm sm:rounded-md text-MAIN text-md sm:text-lg  font-bold">
            <TbLicense />
            <span>{license}</span>
          </li>
        )}
        {platform && (
          <li className="flex gap-2 items-center bg-NEUTRAL_BG p-1 sm:p-2 rounded-sm sm:rounded-md text-MAIN text-md sm:text-lg  font-bold">
            <GiFlatPlatform /> <span>{platform}</span>
          </li>
        )}
      </ul>
    </section>
  );
};

export default Stats;
