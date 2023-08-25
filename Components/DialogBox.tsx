import { DialogContext } from "@/context/DialogContext";
import { Alert, AlertDescription, AlertIcon } from "@chakra-ui/react";
import { useContext } from "react";

const DialogBox = () => {
  const { message } = useContext(DialogContext)!;

  if (!message) {
    
    return null;
  }

  const { status, description } = message;

  return (
      <Alert status={status}>
        <AlertIcon />
        <AlertDescription>{description}</AlertDescription>
      </Alert>
  
  );
};

export default DialogBox;
