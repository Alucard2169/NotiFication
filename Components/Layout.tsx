import React, { FC, ReactNode, useContext,useState,useEffect } from "react";
import Auth from "./Auth";
import Navbar from "./Navbar";
import Loading from "./Loading";
import { useRouter } from "next/router";
import Head from "next/head";
import DialogBox from "./DialogBox";
import { DialogContext, DialogContextProps } from "@/context/DialogContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const { dialogState } = useContext(DialogContext) as DialogContextProps;

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };

    const handleComplete = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <div className="bg-MAIN w-screen h-screen overflow-x-hidden">
      <Head>
        <title>notify</title>
      </Head>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {dialogState && <DialogBox />}
          <Auth />
          <Navbar />
          {children}
        </>
      )}
    </div>
  );
};

export default Layout;
