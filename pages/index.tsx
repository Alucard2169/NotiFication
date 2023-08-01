import { useRouter } from "next/router";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { FiSearch } from "react-icons/fi";


const Tech: FC = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");

 const purgeDatabase = async () => {
   const response = await fetch("/api/unsubscribe");
   const data = await response.json();
 };

 const schedulePurgeDatabase = () => {
   // Calculate the time remaining until the next month starts
   const now = new Date();
   const nextMonth = new Date(now);
   nextMonth.setMonth(nextMonth.getMonth() + 1, 1);
   const timeUntilNextMonth = nextMonth.getTime() - now.getTime();

   // Schedule the purgeDatabase function to run after the calculated time
   setTimeout(async () => {
     await purgeDatabase();
     schedulePurgeDatabase(); // Schedule the next run for the next month
   }, timeUntilNextMonth);
 };
  const handleSearch = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    router.push(`/technology/name/${name}`);
  };

  const handleTechChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };
  return (
    <div className="bg-MAIN flex flex-col gap-8 p-4 w-screen  justify-center items-center">
      <div className="flex flex-col gap-16 items-center mt-52">
        <h1 className="text-white font-bold text-3xl">
          Welcome To{" "}
          <span className="bg-COMPONENT_BG p-2 rounded-md ">notify</span>
        </h1>
        <form
          className="flex items-baseline gap-4 m-auto"
          onSubmit={handleSearch}
        >
          <label htmlFor="search" className="relative z-10">
            <FiSearch className="absolute left-2 top-1/3 text-white font-bold" />
            <input
              type="text"
              id="search"
              className="rounded-full py-2 pl-10 pr-4 text-lg focus:outline-COMPONENT_BG focus:bg-MAIN focus:text-COMPONENT_BG bg-COMPONENT_BG text-MAIN font-semibold outline-none placeholder:text-MAIN transition-all duration-200"
              placeholder="ex: npm or react"
              value={name}
              onChange={handleTechChange}
            />
          </label>
        </form>
        <p className=" sm:w-full md:w-1/2  text-center   text-white ">
          notify is a tool that let the user search for and subscribing to
          packages/libraries, enabling users to receive real-time notifications
          regarding updates and upgrades.
        </p>
      </div>
    </div>
  );
};

export default Tech;
