import Layout from "@/Components/Layout";
import { DialogContextProvider } from "@/context/DialogContext";

import UserContextProvider from "@/context/UserContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <DialogContextProvider>

        <UserContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserContextProvider>

    </DialogContextProvider>
  );
}
