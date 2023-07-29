import { useRouter } from "next/router";
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

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
  const router = useRouter();
  const [data, setData] = useState<StateProps | null>(null);

  const contextValue: UserContextProps = {
    data: data,
    setData: setData,
  };

  useEffect(() => {
    const initial = async () => {
      try {
        const response = await fetch(`/api/initial`);
        if (!response.ok) {
          setData(null)
        }
        else {
          const data = await response.json();
          setData(data);
        }
        
      } catch (error) {
        console.error(error);
      }
    };

    initial();
  }, []);

  return (
    <userContext.Provider value={contextValue}>{children}</userContext.Provider>
  );
};

export default UserContextProvider;
