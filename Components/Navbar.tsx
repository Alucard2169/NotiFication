import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";
import pfp from "@/public/1.jpg";
import { useState, FC, FormEvent, ChangeEvent } from "react";
import Link from "next/link";

const Navbar: FC = () => {
  const router = useRouter();
  const [select, setSelect] = useState<string>("tech");
  const [name, setName] = useState<string>("");

  const isHomepage = router.pathname === "/" || router.pathname === "/auth";
  if (isHomepage) {
    return null;
  }

  const handleSelect = (prop: string): void => {
    setSelect(prop);
  };

  const isTechPage = router.pathname === "/tech";

  const handleLogout = async () => {
    const response = await fetch("/api/logout");
    router.replace("/");
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
        {!isTechPage ? (
          <li
            className={`${
              select === "tech" ? "custom-list" : "custom-list-N"
            } transition-all duration-200`}
            onClick={() => handleSelect("tech")}
          >
            <Link href="/tech">Tech</Link>
          </li>
        ) : (
          <li
            className={`${
              select === "tech" ? "custom-list" : "custom-list-N"
            } transition-all duration-200`}
            onClick={() => handleSelect("tech")}
          >
            Tech
          </li>
        )}
      </ul>
      <form
        className="flex items-baseline gap-4 m-auto"
        onSubmit={handleSearch}
      >
        <label htmlFor="search" className="relative">
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
        <li
          className="px-2 py-1 text-white bg-COMPONENT_BG text-MAIN font-semibold rounded-lg cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </li>
        <Image
          alt="userPfp"
          className="rounded-full w-10 h-10 object-cover"
          width={50}
          height={70}
          src={pfp}
        />
      </ul>
    </nav>
  );
};

export default Navbar;
