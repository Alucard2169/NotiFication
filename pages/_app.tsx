import Layout from '@/Components/Layout'
import { AuthContextProvider } from '@/context/AuthContext'
import UserContextProvider from '@/context/UserContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
       <AuthContextProvider>
      <Layout>
    <Component {...pageProps} />
  </Layout>
    </AuthContextProvider>
   </UserContextProvider>
  )
}
