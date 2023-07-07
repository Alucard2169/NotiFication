import { useRouter } from "next/router";

import Image from "next/image";
import pfp from "@/public/1.jpg";
import { FC, useContext } from "react";
import Link from "next/link";
import { UserContextProps, userContext } from "@/context/UserContext";
import { AuthContextProps, authContext } from "@/context/AuthFormContext";

const Navbar: FC = () => {
  const authContextValue = useContext(authContext) as AuthContextProps;
  const { setState } = authContextValue;
  const userContextValue = useContext(userContext) as UserContextProps;
  const { data, setData } = userContextValue;
  const router = useRouter();

  const handleLogout = async () => {
    setData(null);
    const response = await fetch("/api/logout");
    if (router.pathname.startsWith(`/user/`)) router.push("/");
  };

  return (
    <nav className="w-screen lg:px-8 py-2 sm:px-4 flex justify-between items-center bg-PRIMARY">
      <ul className="flex gap-4 items-center">
        <li className={`${"custom-list"} transition-all duration-200`}>
          <Link href="/">notify</Link>
        </li>
      </ul>

      <ul className="flex gap-8 items-center">
        {!data && (
          <li
            className="px-2 py-1  bg-COMPONENT_PRIMARY_BG text-MAIN font-semibold rounded-lg cursor-pointer"
            onClick={() => setState(true)}
          >
            SignUp
          </li>
        )}
        {data && (
          <li
            className="px-2 py-1  bg-COMPONENT_PRIMARY_BG text-MAIN font-semibold rounded-lg cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </li>
        )}
        {data && (
          <Link href={`/user/${data?.user_id}`}>
            <Image
              alt="userPfp"
              className="rounded-full w-10 h-10 object-cover"
              width={50}
              height={70}
              src={pfp}
            />
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
