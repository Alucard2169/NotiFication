import React, { FC, ReactNode } from "react";
import Navbar from "./Navbar";
import Auth from "./Auth";
import Loading from "./Loading";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-MAIN w-screen h-screen overflow-x-hidden">
      <Loading/>
          <Auth/>
          <Navbar />
      {children}
    </div>
  );
};

export default Layout;
