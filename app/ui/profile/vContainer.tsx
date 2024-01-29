import { fetchVersions } from "@/app/actions";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { PacmanLoader } from "react-spinners";
import VCard from "./vCard";

const VersionContainer = () => {
    
    const [data, setData] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any | null>(null)
  
    const getUpdates = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await fetchVersions();
        if (response) {
          setData(response);

        } else {
          setError(response);

        }
      } catch (err: any) {
        setError(err.message);

      } finally {
        setIsLoading(false)
      }
    };

      useEffect(() => {
        getUpdates()
        // Interval to call the function every 3 hours
        const interval = setInterval(getUpdates, 3 * 60 * 60 * 1000); // 3 hours in milliseconds

        return () => {
          clearInterval(interval);
        };
      }, []);
    
  const handleRefresh = () => {
    getUpdates()
  }

  console.log(data)

  if (isLoading) {
    return (
      <div className="w-full flex justify-center mt-[10%]">
        <PacmanLoader color="white" />
      </div>
    );
  }
  else if (data && data.status === "ok") {
    return (
      <>
        <div className="relative">
          <Button
            isLoading={isLoading}
            colorScheme="teal"
            variant="solid"
            onClick={handleRefresh}
            leftIcon={<FiRefreshCcw />}
            marginBottom="1rem"
            position={"absolute"}
            right={0}
          >
            Refresh
          </Button>
        </div>
        {data.messages.length > 0 && (
          <div className="flex mt-12 gap-2  flex-col">
            {data.messages.map(
              (
                packj: {
                  projectName: string;
                  latestVersion: string;
                  daysAgo: number;
                  platform: string;
                },
                i: number
              ) => (
                <VCard
                  key={i}
                  name={packj.projectName}
                  version={packj.latestVersion}
                  days={packj.daysAgo}
                  platform={packj.platform}
                />
              )
            )}

  
          </div>
        )}
        {data.messages.length === 0 && (
          <p className="bg-MAIN_BG p-2 mt-12 rounded-md text-center text-yellow-500">
            No Updates Yet
          </p>
        )}
      </>
    );
  }

  
  else {
    return (
      <p className="bg-red-500 p-2 rounded-md text-center text-MAIN">
        {error}
      </p>
    );
  }
  
}
 
export default VersionContainer;