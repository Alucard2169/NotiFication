import { useContext, useState, useEffect } from "react";
import { UserContextProps, userContext } from "@/context/UserContext";

interface projectProp {
  project_id: string;
  project_name: string;
  platform: string;
  notification: boolean;
}

const Profile = () => {
  const userContextValue = useContext(userContext) as UserContextProps;
  const { data } = userContextValue;
  const [projects, setProjects] = useState<projectProp | null>(null);

  useEffect(() => {
    const fetchProjects = async (): Promise<void> => {
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

        const data = await response.json();

        if (response.ok) {
          console.log(data);
          setProjects(data);
        }
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
  }, []);
  console.log(projects);
  return (
    <div className="p-8 flex gap-8">
      <section className="bg-PRIMARY flex flex-col gap-6 p-4 rounded-md">
        <h1 className="text-COMPONENT_BG bg-MAIN py-1 px-2 font-bold text-2xl rounded-md">
          {data?.username}
        </h1>
        <h3 className="text-white font-semibold text-xl">{data?.email}</h3>
      </section>
      <section className="bg-PRIMARY p-2 rounded-md">
        <h2 className="text-white font-bold text-2xl">My Projects</h2>
      </section>
    </div>
  );
};

export default Profile;
