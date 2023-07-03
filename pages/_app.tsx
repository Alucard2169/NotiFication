import Layout from "@/Components/Layout";
import { AuthContextProvider } from "@/context/AuthFormContext";

import UserContextProvider from "@/context/UserContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContextProvider>
    </AuthContextProvider>
  );
}
