import { formatDate } from "../details/query/releases";

const UserCard = ({
  username,
  email,
  id,
  created_at,
}: {
  username: string;
  email: string;
  id: string;
  created_at : string; }) => {
  return (
    <section className="bg-MAIN_BG rounded-sm sm:rounded-md p-2 w-full sm:pt-4 ">
      <h1 className="text-white font-bold text-md sm:text-xl">
        Username:{" "}
        <span className="bg-PRIMARY_BG text-MAIN p-1 sm:p-2 rounded-sm sm:rounded-md">
          {username}
        </span>
      </h1>
      <h2 className="text-white font-bold text-md sm:text-lg my-8">
        Email:{" "}
        <span className="bg-PRIMARY_BG text-MAIN p-1 sm:p-2 rounded-sm sm:rounded-md">
          {email}
        </span>
      </h2>
      <h3 className="text-white font-bold text-sm sm:text-md">
        id:{" "}
        <span className="bg-PRIMARY_BG text-MAIN p-1 sm:p-2  rounded-sm sm:rounded-md">
          {id}
        </span>
      </h3>

      <aside className=" p-2 py-4  flex flex-col gap-4 items-center mt-4 bg-MAIN rounded-sm sm:rounded-md">
        <p className="text-white text-xs sm:text-sm">
          User Created At:{" "}
          <span className="text-blue-500">{formatDate(created_at)}</span>
        </p>
        {/* <button onClick={deleteAccount} className="text-red-500 font-bold w-fit flex gap-2 p-2 rounded-md transition-all hover:bg-red-500 hover:text-MAIN"><MdDelete/>  Delete Account</button> */}
      </aside>
    </section>
  );
};
 
export default UserCard;