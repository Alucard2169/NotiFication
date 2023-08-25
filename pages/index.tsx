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
      <div className="flex flex-col gap-14 items-center">
        <h1 className="text-NEUTRAL flex items-center gap-2 font-bold text-2xl">
          Welcome To{" "}
          <span className="text-NEUTRAL p-2 flex items-center w-fit bg-PRIMARY  rounded-md ">
            notify
          </span>
        </h1>
        <form
          className="flex items-baseline gap-4 m-auto"
          onSubmit={handleSearch}
        >
          <label htmlFor="search" className="relative z-10">
            <FiSearch className="absolute left-2 top-1/3 text-NEUTRAL font-bold" />
            <input
              type="text"
              id="search"
              className="rounded-full py-2 pl-10 pr-4 text-lg font-normal focus:outline-PRIMARY focus:bg-MAIN bg-PRIMARY   text-NEUTRAL  outline-none placeholder:text-MAIN transition-all duration-200"
              placeholder="ex: npm or react"
              value={name}
              onChange={handleTechChange}
            />
          </label>
        </form>
        <p className=" sm:w-full md:w-1/2 font-normal text-sm text-center   text-white ">
          Notify makes it easy to search and subscribe to packages and
          libraries. Stay informed with real-time notifications for updates and
          upgrades.
        </p>
      </div>
    </div>
  );
};

export default Tech;
