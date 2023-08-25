import { UserContextProps, userContext } from "@/context/UserContext";
import { useSubscribe } from "@/hooks/useSubscribe";
import { TechData } from "@/types/techInterface";
import Link from "next/link";
import { FC, useContext } from "react";
import { AiFillBell, AiFillGithub } from "react-icons/ai";
import { BiLinkExternal } from 'react-icons/bi';
import { FiGlobe, FiPackage, FiStar } from "react-icons/fi";
import { LineWave } from "react-loader-spinner";

interface TechProps {
  tech: TechData;
  key: number;
}


const TechCard: FC<TechProps> = ({ tech, key }) => {
  const userContextValue = useContext(userContext) as UserContextProps;
  const { data } = userContextValue;
 
  const { isLoading, handleSubscribe, addCommasToNumber } = useSubscribe(tech)


  return (
    <div
      className="p-2 rounded-md flex flex-col gap-4 lg:w-96 border-PRIMARY border-2 sm:w-full"
      key={key}
    >
      <div className="flex justify-between items-center">
        <h1 className=" rounded-lg w-fit p-2 text-NEUTRAL bg-PRIMARY rouded-md font-semibold text-md">
          {tech.name}
        </h1>
        {isLoading ? (
          <div className="!ml-auto">
            <LineWave
              height="50"
              width="50"
              color="#121212"
              ariaLabel="line-wave"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              firstLineColor="#ffffff"
              middleLineColor="#121212"
              lastLineColor="#ffffff"
            />
          </div>
        ) : null}
        {data && (
          <AiFillBell
            className="p-1 text-3xl  rounded-md text-NEUTRAL ml-auto cursor-pointer hover:text-PRIMARY hover:bg-MAIN transition-all duration-200"
            onClick={handleSubscribe}
          />
        )}
        <Link
          href={`/technology/${tech.platform}/${tech.name}`}
          title="view details"
        >
          <BiLinkExternal className="text-NEUTRAL text-xl" />
        </Link>
      </div>
      <div className="bg-MAIN rounded-lg p-2 flex flex-col gap-4 h-full justify-between">
        <ul className="bg-PRIMARY flex gap-4 p-2 rounded-md">
          <li>
            <a
              href={tech.repository_url}
              title="github repo link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillGithub className="text-NEUTRAL bg-PRIMARY p-1 rounded-md text-4xl" />
            </a>
          </li>
          <li>
            <a
              href={tech.homepage}
              title="homepage"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiGlobe className="text-NEUTRAL bg-MAIN p-1 rounded-md text-4xl" />
            </a>
          </li>
          <li>
            <a
              href={tech.package_manager_url}
              title="package link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiPackage className="text-NEUTRAL bg-MAIN p-1 rounded-md text-4xl" />
            </a>
          </li>
          <li className="text-NEUTRAL bg-MAIN  p-1 rounded-md flex gap-2 items-center">
            <FiStar className="text-2xl" />
            <span className="text-md text-COMPONENT_BG font-semibold">
              {addCommasToNumber(tech.stars)}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TechCard;
