"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState
} from "react";

export interface UserContextProps {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
}

const defaultValue: UserContextProps = {
  user: null,
  setUser: () => {}, // Provide a default function if needed
};

const UserContext = createContext<UserContextProps>(defaultValue);

const UserContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
      }
    };

    getUser();
  },[])
   




  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
export { UserContext };
