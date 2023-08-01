import { DialogContext, DialogContextProps } from "@/context/DialogContext";
import { UserContextProps, userContext } from "@/context/UserContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { BiSolidBellOff } from "react-icons/bi";

interface ProjectProp {
  package_id: string;
  project_name: string;
  platform: string;
  notification: boolean;
}

interface UpdateProp {
  project_name: string;
  latest_version: string;
  time: number;
}

const Profile = () => {
  const userContextValue = useContext(userContext) as UserContextProps;
   const { setMessage, setDialogState } = useContext(
     DialogContext
   ) as DialogContextProps;
  const { data } = userContextValue;
  const [projects, setProjects] = useState<ProjectProp[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);
  const [updates, setUpdates] = useState<any>(null);

  useEffect(() => {
    const fetchProjects = async (): Promise<void> => {
      setIsLoading(true);

      if (data === null) {
        return;
      }

      const { user_id } = data;

      try {
        const response = await fetch(
          `${window.location.origin}/api/getProjects?id=${user_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const responseData = await response.json();

        if (response.ok) {
          console.log(responseData);
          setProjects(responseData.Data);
        }
      } catch (err) {
        console.log(err);
      }

      setIsLoading(false);
    };

    if (data !== null) {
      fetchProjects();
    }
  }, [data]);

  useEffect(() => {
    const getUpdates = async (): Promise<void> => {
      if (data === null) {
        return;
      }
      const { user_id } = data;
      try {
        setIsUpdateLoading(true);
        const response = await fetch(`/api/checkUpdates?id=${user_id}`);
        if (response.ok) {
          const data = await response.json();
          setUpdates(data.messages);
          setIsUpdateLoading(false);
        } else {
          const data = await response.json();
          console.log(data);
          setIsUpdateLoading(false);
        }
      } catch (err: any) {
        console.log(err);
      }
    };

    // Function to be called every 3 hours
    getUpdates();

    // Interval to call the function every 3 hours
    const interval = setInterval(getUpdates, 3 * 60 * 60 * 1000); // 3 hours in milliseconds

    return () => {
      clearInterval(interval);
    };
  }, [data]);

  const handleUnsubscription = async (packageId: string): Promise<void> => {
    if (data === null) {
      return;
    }
    const { user_id } = data;

    try {
      const response = await fetch(`/api/deleteSubscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user_id,
          package_id: packageId,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setDialogState(true)
         setMessage({
           status: "success",
           description: `Unsubscribed`,
         });
        // Update the projects state by removing the unsubscribed project
        setProjects((prevProjects) => {
          if (prevProjects) {
            return prevProjects.filter(
              (project) => project.package_id !== packageId
            );
          }
          return null;
        });
        // Reset the updates state to null
        setUpdates(null);
      } else {
        const data = await response.json();
        console.log(data);
      }
    } catch (err: any) {
      setDialogState(true)
      setMessage({
        status: 'error',
        description:err.message
      })
    }
  };

  return (
    <div className="p-4 sm:p-8 flex flex-col sm:flex-row gap-8">
      <section className="bg-PRIMARY flex flex-col gap-6 p-4 rounded-md h-fit">
        <h1 className="text-PRIMARY bg-MAIN py-1 px-2 font-bold text-2xl rounded-md">
          {data?.username}
        </h1>
        <h3 className="text-MAIN font-semibold text-xl">{data?.email}</h3>
      </section>
      <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-2">
        <section className="bg-MAIN border border-PRIMARY p-1 sm:p-2 rounded-md w-full  sm:w-1/2">
          <h2 className="text-white font-bold text-2xl">My Projects</h2>
          {projects !== null && projects.length !== 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-8 h-auto">
              {projects.map((project) => (
                <div
                  key={project.package_id}
                  className="flex flex-col gap-1 sm:gap-2 bg-MAIN border border-PRIMARY p-2 rounded-md"
                >
                  <h1 className="bg-PRIMARY p-1 rounded-md text-MAIN font-semibold  text-lg sm:text-xl">
                    {project.project_name}
                  </h1>
                  <p className="text-white font-bold">
                    Platform:{" "}
                    <span className="bg-PRIMARY text-MAIN p-1 rounded-md text-sm sm:text-xl ">
                      {project.platform}
                    </span>
                  </p>
                  <div className="flex justify-between mt-4">
                    <BiSolidBellOff
                      className="bg-PRIMARY text-MAIN p-1 rounded-md text-3xl cursor-pointer"
                      onClick={() => handleUnsubscription(project.package_id)}
                    />
                    <Link
                      href={`/technology/${project.platform}/${project.project_name}`}
                    >
                      <AiFillInfoCircle className="bg-PRIMARY text-MAIN p-1 rounded-md text-3xl" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6">
              <p className="bg-MAIN p-2 rounded-md text-COMPONENT_BG text-xl font-semibold">
                {isLoading ? "Loading..." : "No project Added Yet"}
              </p>
            </div>
          )}
        </section>
        <section className="bg-PRIMARY p-2 rounded-md w-full sm:w-1/2 flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <h2 className="text-MAIN font-bold text-2xl">Updates</h2>
          </div>
          {updates ? (
            <div className="grid gap-4 h-auto">
              {updates.map((update: UpdateProp, i: number) => (
                <div
                  key={i}
                  className="flex flex-col gap-1 sm:gap-2 bg-MAIN rounded-md p-1 sm:p-2"
                >
                  <p className=" text-PRIMARY p-1 rounded-md font-medium w-fit">
                    Package:{" "}
                    <span className="bg-PRIMARY text-MAIN p-1 rounded-md text-lg font-semibold text-COMPONENT_PRIMARY_BG">
                      {update.project_name}
                    </span>
                  </p>
                  <p className="text-PRIMARY p-1 rounded-md font-medium w-fit">
                    Version:{" "}
                    <span className="bg-PRIMARY p-1 rounded-md text-sm font-semibold text-MAIN">
                      {update.latest_version}
                    </span>
                  </p>
                  <p className="text-PRIMARY p-1 rounded-md font-medium w-fit">
                    Time:{" "}
                    <span className="bg-PRIMARY p-1 rounded-md text-sm font-semibold text-MAIN">
                      {update.time}
                    </span>{" "}
                    Days ago
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="bg-MAIN p-2 rounded-md text-MAIN text-xl font-semibold">
              {isUpdateLoading ? "Loading updates..." : "No updates available"}
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;
