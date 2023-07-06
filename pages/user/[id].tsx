import { useContext, useState, useEffect } from "react";
import { UserContextProps, userContext } from "@/context/UserContext";
import { AiFillInfoCircle, AiFillBell } from "react-icons/ai";
import Link from "next/link";

interface ProjectProp {
  project_id: string;
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
  const { data } = userContextValue;
  const [projects, setProjects] = useState<ProjectProp[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);
  const [updates, setUpdates] = useState<any>(null);

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

  const getUpdates = async () => {
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

  useEffect(() => {
    if (data !== null) {
      fetchProjects();
    }
  }, [data]);

  useEffect(() => {
    // Function to be called every 3 hours
    getUpdates();

    //interval to call the function every 3 hours
    const interval = setInterval(getUpdates, 3 * 60 * 60 * 1000); // 3 hours in milliseconds

    // Clean up the interval when the component is unmounted
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="p-8 flex gap-8">
      <section className="bg-PRIMARY flex flex-col gap-6 p-4 rounded-md h-fit">
        <h1 className="text-COMPONENT_BG bg-MAIN py-1 px-2 font-bold text-2xl rounded-md">
          {data?.username}
        </h1>
        <h3 className="text-white font-semibold text-xl">{data?.email}</h3>
      </section>
      <div className="w-full flex gap-2">
        <section className="bg-PRIMARY p-2 rounded-md w-1/2">
          <h2 className="text-white font-bold text-2xl">My Projects</h2>
          {projects !== null && projects.length !== 0 ? (
            <div className="grid grid-cols-3 gap-8 mt-8">
              {projects.map((project) => (
                <div
                  key={project.project_id}
                  className="flex flex-col gap-2 bg-MAIN p-2 rounded-md"
                >
                  <h1 className="bg-PRIMARY p-1 rounded-md text-COMPONENT_BG font-semibold text-xl">
                    {project.project_name}
                  </h1>
                  <p className="text-white font-bold">
                    Platform:{" "}
                    <span className="bg-PRIMARY text-COMPONENT_BG p-1 rounded-md">
                      {project.platform}
                    </span>
                  </p>
                  <div className="flex justify-between mt-4">
                    <AiFillBell className="bg-PRIMARY text-COMPONENT_BG p-1 rounded-md text-3xl" />
                    <Link
                      href={`/technology/${project.platform}/${project.project_name}`}
                    >
                      <AiFillInfoCircle className="bg-PRIMARY text-white p-1 rounded-md text-3xl" />
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
        <section className="bg-PRIMARY p-2 rounded-md w-1/2 flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <h2 className="text-white font-bold text-2xl">Updates</h2>
          </div>
          {updates ? (
            <div className="grid gap-4 h-auto">
              {updates.map((update: UpdateProp) => (
                <p className="bg-MAIN text-COMPONENT_PRIMARY_BG p-2 rounded-md">
                  <span className="bg-PRIMARY text-COMPONENT_BG font-semibold text-lg p-1 rounded-md">
                    {update.project_name}
                  </span>
                  -{update.latest_version} - published{" "}
                  <span className="bg-PRIMARY text-COMPONENT_BG font-semibold text-sm p-1 rounded-md">
                    {" "}
                    {update.time} days ago
                  </span>
                </p>
              ))}
            </div>
          ) : (
            <p className="bg-MAIN p-2 rounded-md text-COMPONENT_BG text-xl font-semibold">
              {isUpdateLoading ? "Loading updates..." : "No updates available"}
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;
