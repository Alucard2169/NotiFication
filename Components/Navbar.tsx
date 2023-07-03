import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";
import pfp from "@/public/1.jpg";
import { useState, FC, FormEvent, ChangeEvent, useContext } from "react";
import Link from "next/link";
import { UserContextProps, userContext } from "@/context/UserContext";
import { AuthContextProps, authContext } from "@/context/AuthFormContext";

const Navbar: FC = () => {
  const authContextValue = useContext(authContext) as AuthContextProps;
  const { setState } = authContextValue;
  const userContextValue = useContext(userContext) as UserContextProps;
  const { data, setData } = userContextValue;
  const router = useRouter();
  const [name, setName] = useState<string>("");

  const handleLogout = async () => {
    setData(null);
    const response = await fetch("/api/logout");
    router.push("/");
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    router.push(`/technology/name/${name}`);
  };

  const handleTechChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  return (
    <nav className="w-screen px-8 py-2 flex justify-between items-center bg-PRIMARY">
      <ul className="flex gap-4 items-center">
        <li className={`${"custom-list"} transition-all duration-200`}>
          <Link href="/">notify</Link>
        </li>
      </ul>
      <form
        className="flex items-baseline gap-4 m-auto"
        onSubmit={handleSearch}
      >
        <label htmlFor="search" className="relative z-10">
          <FiSearch className="absolute left-2 top-1/3 text-white font-bold" />
          <input
            type="text"
            id="search"
            className="rounded-full py-2 pl-10 pr-4 text-md focus:outline-COMPONENT_BG focus:bg-MAIN focus:text-COMPONENT_BG bg-COMPONENT_BG text-MAIN font-semibold outline-none placeholder:text-MAIN transition-all duration-200"
            placeholder="ex: npm or react"
            value={name}
            onChange={handleTechChange}
          />
        </label>
      </form>
      <ul className="flex gap-8 items-center">
        {!data && (
          <li
            className="px-2 py-1 text-white bg-COMPONENT_BG text-MAIN font-semibold rounded-lg cursor-pointer"
            onClick={() => setState(true)}
          >
            SignUp
          </li>
        )}
        {data && (
          <li
            className="px-2 py-1 text-white bg-COMPONENT_BG text-MAIN font-semibold rounded-lg cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </li>
        )}
        <Link href={`/user/${data?.user_id}`} as={`/user/${data?.username}`}>
          <Image
            alt="userPfp"
            className="rounded-full w-10 h-10 object-cover"
            width={50}
            height={70}
            src={pfp}
          />
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
