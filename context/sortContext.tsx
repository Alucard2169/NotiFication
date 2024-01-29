"use client";


import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState
} from "react";

export interface SortContextProps {
  sort: any;
  setSort: Dispatch<SetStateAction<any>>;
}

const defaultValue: SortContextProps = {
  sort: { Licenses: "", Languages: "", Keywords: "", Platforms: "" },
  setSort: () => {}, // Provide a default function if needed
};

const SortContext = createContext<SortContextProps>(defaultValue);

const SortContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sort, setSort] = useState({
    Licenses: "",
    Languages: "",
    Keywords: "",
    Platforms: "",
  });


  return (
    <SortContext.Provider value={{ sort, setSort }}>
      {children}
    </SortContext.Provider>
  );
};

export default SortContextProvider;
export { SortContext };
