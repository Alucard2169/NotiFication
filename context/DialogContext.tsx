import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

export interface MessageProps {
  status: "info" | "warning" | "success" | "error" | "loading" | undefined; // Fix the type here
  description: string; // Corrected spelling here
}

 

export interface DialogContextProps {
  dialogState: boolean;
  setDialogState: Dispatch<SetStateAction<boolean>>;
  message: MessageProps | null; // Update type here
  setMessage: Dispatch<SetStateAction<MessageProps | null>>; // Update type here
}

const DialogContext = createContext<DialogContextProps | null>(null);

interface DialogContextProviderProps {
  children: ReactNode;
}

// DialogContextProvider component
const DialogContextProvider = ({ children }: DialogContextProviderProps) => {
  const [dialogState, setDialogState] = useState<boolean>(false);
  const [message, setMessage] = useState<MessageProps | null>(null);

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

