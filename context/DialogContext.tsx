import React, {
  createContext,
  ReactNode,
  useState,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";

export interface DialogContextProps {
  dialogState: boolean;
  setDialogState: Dispatch<SetStateAction<boolean>>;
  message: string | null;
  setMessage: Dispatch<SetStateAction<string | null>>;
}

const DialogContext = createContext<DialogContextProps | null>(null);

interface DialogContextProviderProps {
  children: ReactNode;
}

// DialogContextProvider component
const DialogContextProvider = ({ children }: DialogContextProviderProps) => {
  const [dialogState, setDialogState] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const contextValue: DialogContextProps = {
    dialogState: dialogState,
    setDialogState: setDialogState,
    message: message,
    setMessage: setMessage,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDialogState(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, [dialogState]);

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
    </DialogContext.Provider>
  );
};

export { DialogContext, DialogContextProvider };
