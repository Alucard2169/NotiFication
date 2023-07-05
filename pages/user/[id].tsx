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

const Profile = () => {
  const userContextValue = useContext(userContext) as UserContextProps;
  const { data } = userContextValue;
  const [projects, setProjects] = useState<ProjectProp[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  // const getUpdates = async () => {
  //   try {

  //   }
  // }

  useEffect(() => {
    if (data !== null) {
      fetchProjects();
    }
  }, [data]);

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
        <section className="bg-PRIMARY p-2 rounded-md w-1/2">
          <h2 className="text-white font-bold text-2xl">Updates</h2>
          <div></div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
