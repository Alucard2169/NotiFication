import { useContext } from "react";
import { UserContextProps, userContext } from "@/context/UserContext";

const Profile = () => {
  const userContextValue = useContext(userContext) as UserContextProps;
  const { data } = userContextValue;

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
