import { DialogContext, DialogContextProps } from "@/context/DialogContext";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, ReactNode, useContext, useEffect, useState } from "react";
import AuthForm from "./Auth";
import DialogBox from "./DialogBox";
import Loading from "./Loading";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
  const [formState,setFormState] = useState(false)
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
            <AuthForm state={{ formState, setFormState }} />
            <Navbar stateProps={{ formState, setFormState }} />
          {children}
        </>
      )}
    </div>
  );
};

export default Layout;
