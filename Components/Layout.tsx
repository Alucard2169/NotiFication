import React, { FC, ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
      <div className="bg-MAIN w-screen h-screen">
        <Navbar/>
      {children}
    </div>
  );
};

export default Layout;
