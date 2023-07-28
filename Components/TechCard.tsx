import { DialogContext, DialogContextProps } from "@/context/DialogContext";
import { UserContextProps, userContext } from "@/context/UserContext";
import wait from "@/public/wait.gif";
import { TechData } from "@/types/techInterface";
import Image from "next/image";
import Link from "next/link";
import { FC, useContext, useState } from "react";
import { AiFillBell, AiFillGithub, AiFillInfoCircle } from "react-icons/ai";
import { FiGlobe, FiPackage, FiStar } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";




interface TechProps {
  tech: TechData;
  key: number;
}

interface handleStoreProps {
  package_id: string;
  user_id: number;
  project_name: string;
  platform: string;
  notification: boolean;
  current_version: string;
  last_date: string;
}

const TechCard: FC<TechProps> = ({ tech, key }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userContextValue = useContext(userContext) as UserContextProps;
  const { data } = userContextValue;
 
  const { setMessage, setDialogState } = useContext(
    DialogContext
  ) as DialogContextProps;
 
  const addCommasToNumber = (number: number): string => {
    return number.toLocaleString();
  };

  const handleSubscribe = async (): Promise<void> => {
    if (data === null) {
      return;
    }
    const { user_id } = data;
    const {
      name,
      platform,
      latest_release_number,
      latest_release_published_at,
    } = tech;

    try {
      setIsLoading(true);

      const checkResponse = await fetch("/api/checkSubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          project_name: name,
          platform,
        }),
      });

      const checkData = await checkResponse.json();

      if (checkResponse.ok) {
        if (checkData.subscribed) {
          setIsLoading(false);
          setDialogState(true);
          setMessage(`Already subscribed to ${name}`);
        } else {
          const response = await fetch("/api/subscribe", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              package_id: uuidv4(),
              user_id,
              project_name: name,
              platform,
              notification: true,
              current_version: latest_release_number,
              last_date: latest_release_published_at,
            }),
          });

          const responseData = await response.json();

          if (response.ok) {
            console.log(responseData);
            console.log("success");
            setDialogState(true);
            setMessage(`Subscribed to ${name}`);
            setIsLoading(false);
          } else {
            setIsLoading(false);
            console.log("error");
          }
        }
      } else {
        setIsLoading(false);
        console.log(checkData);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };


  return (
    <div
      className="p-2 rounded-md flex flex-col gap-2 lg:w-96 border border-PRIMARY border-2 sm:w-full"
      key={key}
    >
      <div className="flex justify-between items-center">
        <h1 className="bg-MAIN rounded-lg w-fit p-2 text-MAIN_TEXT font-semibold text-xl">
          {tech.name}
        </h1>
        {isLoading ? (
          <Image
            src={wait}
            width={40}
            height={40}
            alt="wait gif"
            className="ml-auto mr-4 rounded-md"
          />
        ) : null}
        {data && (
          
          <AiFillBell
            className="bg-MAIN p-1 text-3xl rounded-md text-COMPONENT_PRIMARY_BG cursor-pointer hover:text-white"
            onClick={handleSubscribe}
          />
        )}
      </div>
      <div className="bg-MAIN rounded-lg p-2 flex flex-col gap-4 h-full justify-between">
        <p className="text-white text-md font-semibold">{tech.description}</p>
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
  );
};

export default TechCard;
