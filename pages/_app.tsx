import Layout from "@/Components/Layout";
import { AuthContextProvider } from "@/context/AuthFormContext";
import { DialogContextProvider } from "@/context/DialogContext";

import UserContextProvider from "@/context/UserContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
        <UserContextProvider>
      <DialogContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
    </DialogContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
  );
}
