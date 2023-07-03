import React, {
  createContext,
  ReactNode,
  useState,
  SetStateAction,
  Dispatch,
} from "react";

export interface AuthContextProps {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
}

const authContext = createContext<AuthContextProps | null>(null);

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, setState] = useState<boolean>(false);

  const contextValue: AuthContextProps = {
    state: state,
    setState: setState,
  };

  return (
    <authContext.Provider value={contextValue}>{children}</authContext.Provider>
  );
};

export { authContext, AuthContextProvider };
