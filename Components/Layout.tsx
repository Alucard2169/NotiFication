import React, { FC, ReactNode } from "react";
import Auth from "./Auth";
import Navbar from "./Navbar";
import Loading from "./Loading";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

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
          <Auth />
          <Navbar />
          {children}
        </>
      )}
    </div>
  );
};

export default Layout;
