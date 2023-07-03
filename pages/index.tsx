import Link from "next/link";
import { FC } from "react";

interface dta {
  data: any;
}

const Home: FC<dta> = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-8 justify-center items-center">
      <h1 className="text-white text-4xl">
        Welcome to{" "}
        <span className="bg-COMPONENT_BG text-MAIN py-1 px-2 rounded-md">
          notify
        </span>
      </h1>
      <p className="flex gap-2 items-center text-COMPONENT_BG font-semibold text-xl">
        <button className="bg-COMPONENT_BG text-MAIN rounded-md py-2 px-3 text-xl font-semibold">
          <Link href="/auth">SignUp</Link>
        </button>
        to get started
      </p>
    </div>
  );
};

export default Home;
