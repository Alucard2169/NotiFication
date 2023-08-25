import { DialogContext, DialogContextProps } from "@/context/DialogContext";
import { UserContextProps, userContext } from "@/context/UserContext";
import { useContext, useEffect, useState } from "react";

export const useGetUpdates = () => {
  const userContextValue = useContext(userContext) as UserContextProps;
  const { setMessage, setDialogState } = useContext(
    DialogContext
  ) as DialogContextProps;
  const { data } = userContextValue;
  const [updates, setUpdates] = useState<any>(null);
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);

  useEffect(() => {
    const getUpdates = async (): Promise<void> => {
      if (data === null) {
        return;
      }
      const { user_id } = data;
      try {
        setIsUpdateLoading(true);
        const response = await fetch(`/api/checkUpdates?id=${user_id}`);
        if (response.ok) {
          const data = await response.json();
          setUpdates(data.messages);
          setIsUpdateLoading(false);
        } else {
          const data = await response.json();
          console.log(data);
          setIsUpdateLoading(false);
        }
      } catch (err: any) {
        console.log(err);
      }
    };

    // Function to be called every 3 hours
    getUpdates();

    // Interval to call the function every 3 hours
    const interval = setInterval(getUpdates, 3 * 60 * 60 * 1000); // 3 hours in milliseconds

    return () => {
      clearInterval(interval);
    };
  }, [data]);

  return { updates, isUpdateLoading };
};
