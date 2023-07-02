import Image from "next/image";
import { FC } from "react";
import loadingGIF from "@/public/loading.gif";

const Loading = () => {
  return (
    <div className="text-center flex flex-col gap-8 justify-center items-center w-screen h-screen">
      <Image
        src={loadingGIF}
        alt="loading animation"
        width={400}
        height={200}
      />
      <p className="text-white font-bold">Loading...</p>
    </div>
  );
};

export default Loading;
