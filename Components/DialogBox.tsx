import { useContext } from "react";
import { DialogContextProps, dialogContext } from "@/context/DialogContext";

const DialogBox = () => {
  const { message } = useContext(dialogContext) as DialogContextProps;
  return (
    <div className="fixed z-20 h-screen w-screen flex justify-center items-center bg-black bg-opacity-80">
      <dialog open className="p-2 bg-COMPONENT_PRIMARY_BG rounded-md">
        <p className="text-2xl text-MAIN font-semibold">{message}</p>
      </dialog>
    </div>
  );
};

export default DialogBox;
