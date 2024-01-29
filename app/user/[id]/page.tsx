"use client"


import ProjectContainer from "@/app/ui/profile/projectContainer";
import UserCard from "@/app/ui/profile/userCard";
import VersionContainer from "@/app/ui/profile/vContainer";
import { UserContext, UserContextProps } from "@/context/userContext";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Loading } from "../../ui/loading";
const Page = () => {
    const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext<UserContextProps>(UserContext);

  useEffect(() => {
    if (user !== null) setIsLoading(false);
  }, [user]);

  if (isLoading) {
    return <Loading />;
  }


  const {
    user_metadata: { username },
    email,
    id,
    created_at,
  } = user;



  return (
    <div className="pt-4 flex flex-col gap-8 sm:flex-row sm:gap-2 ">
      {user && (
        <div className="w-full sm:w-3/5">
          <UserCard
            username={username}
            email={email}
            id={id}
            created_at={created_at}
          />
        </div>
      )}

      <div className="w-full">
        <Tabs isFitted variant="enclosed">
          <TabList mb="1rem">
            <Tab fontWeight={800}>Projects</Tab>
            <Tab fontWeight={800}>Versions</Tab>
          </TabList>
          <TabPanels>
              <ProjectContainer />
            <TabPanel>
              <VersionContainer />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
