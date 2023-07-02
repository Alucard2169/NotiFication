import React, { FC, createContext, ReactNode, useState, SetStateAction, Dispatch } from 'react';

interface StateProps {
  user_id: number;
  username: string;
  email: string;
}

export interface UserContextProps {
  data: StateProps | null;
  setData: Dispatch<SetStateAction<StateProps | null>>;
}

interface Props {
  children: ReactNode;
}

export const userContext = createContext<UserContextProps | null>(null);

const UserContextProvider: FC<Props> = ({ children }) => {
  const [data, setData] = useState<StateProps | null>(null);

  const contextValue: UserContextProps = {
    data: data,
    setData: setData,
  };

    console.log(data)
    
  return (
    <userContext.Provider value={contextValue}>
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
