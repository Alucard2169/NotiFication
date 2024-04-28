"use client"

import { subscribeProject } from "@/app/actions";
import { UserContext, UserContextProps } from "@/context/userContext";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  GridItem,
  Heading,
  useToast
} from "@chakra-ui/react";
import Link from "next/link";
import { ReactElement, ReactNode, useContext, useState } from "react";
import { CgWebsite } from "react-icons/cg";
import { CiBellOn } from "react-icons/ci";
import { FaExternalLinkSquareAlt, FaStar } from "react-icons/fa";
import { FaCodeFork, FaLanguage } from "react-icons/fa6";
import { CardContainerProps } from "./cardContainer";


 export interface packageDataProps {
   user_id: string;
   project_name: string;
   platform: string;
   subscribed: boolean;
   current_version: string;
   last_date: string;
 }

const StatsCard = ({ icon, content }: { content: string; icon: ReactNode }) => {
  


  return (
    <GridItem
      w="100%"
      h="10"
      bg="red.500"
      display="flex"
      justifyContent="center"
      gap="2"
      alignItems="center"
      borderRadius="10"
    >
      {icon}
      <span className="h-4 text-MAIN font-bold">{content}</span>
    </GridItem>
  );
};

const CardButton = ({ icon, link,externalLink = null, content }: { icon: ReactElement; link: string | null, externalLink : string | null; content: string }) => {
    
  const [loading,isLoading] = useState(false);


  return (
      <Button
        w="100%"
        h="10"
        colorScheme="blue"
        borderRadius="10"
        leftIcon={icon}
        onClick={() => {
          isLoading(prev => !prev)
        }}
        isLoading={loading}
      >
        {link && (
          <Link href={link} className="h-4 text-MAIN font-bold">
            {content}
          </Link>
        )}
        {externalLink && (
          <a
            href={externalLink}
            className="h-4 text-MAIN font-bold"
          >
            {content}
          </a>
        )}
      </Button>
    );
  };


const CardComponent = ({data}:{data:CardContainerProps}) => {
const { user } = useContext<UserContextProps>(UserContext);

  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const showToast = (head : string ,message: string) => {
    toast({
      title: head,
      description: message,
      status: head === "Error" ? "error" : "success",
      duration: 9000,
      isClosable: true,
    });
  }
    

  const packageData = {
    user_id: user?.id,
    project_name: data.name,
    platform: data.platform,
    subscribed: true,
    current_version: data.latest_release_number,
    last_date: data.latest_release_published_at,
  };


  const handleClick = async () => {
    setIsLoading(true);

    try {
      const  {head,message}  = await subscribeProject(packageData);
      
      showToast(head,message)

    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card key={1} size="sm">
      <CardHeader display="flex" justifyContent="space-between">
        <Heading size="md">{data.name}</Heading>
        {user && (
          <Button
            onClick={handleClick}
            colorScheme="green"
            isLoading={isLoading}
            role="subscribe to recieve notification button"
          >
            <CiBellOn className="font-bold text-xl" />
          </Button>
        )}
      </CardHeader>
      <CardBody>
        <p className="mb-2">{data.description}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <StatsCard
            icon={<FaStar className="h-4" color="black" />}
            content={data.stars.toLocaleString()}
          />
          <StatsCard
            icon={<FaCodeFork className="h-4" color="black" />}
            content={data.forks.toLocaleString()}
          />
          <StatsCard
            icon={<FaLanguage className="h-4" color="black" />}
            content={data.language}
          />
          {data.homepage && data.homepage.length > 0 && (
            <CardButton
              icon={<CgWebsite />}
              link={null}
              content="Homepage"
              externalLink={data.homepage}
            />
          )}
          <CardButton
            icon={<FaExternalLinkSquareAlt />}
            link={`/details/${data.platform}/${data.name}`}
            content="Know More"
            externalLink={null}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default CardComponent;
