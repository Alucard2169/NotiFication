import React, { FC, ReactNode } from "react";
import Navbar from "./Navbar";
import Auth from "./Auth";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
      <div className="bg-MAIN w-screen h-screen">
          <Auth/>
          <Navbar />
      {children}
    </div>
  );
};

export default Layout;
