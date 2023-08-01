import Layout from "@/Components/Layout";
import { DialogContextProvider } from "@/context/DialogContext";
import UserContextProvider from "@/context/UserContext";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <DialogContextProvider>
        <UserContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserContextProvider>
      </DialogContextProvider>
    </ChakraProvider>
  );
}
