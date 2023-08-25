import { DialogContext, DialogContextProps } from "@/context/DialogContext";
import { UserContextProps, userContext } from "@/context/UserContext";
import { TechData } from "@/types/techInterface";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const useSubscribe = (tech:TechData) => {
  const [isLoading, setIsLoading] = useState(false);
  const userContextValue = useContext(userContext) as UserContextProps;
  const { data } = userContextValue;

  const { setMessage, setDialogState } = useContext(
    DialogContext
  ) as DialogContextProps;

  const addCommasToNumber = (number:number) => {
    return number.toLocaleString("en-IN");
  };

  const handleSubscribe = async () => {
    if (data === null) {
      return;
    }
    const { user_id } = data;
    const {
      name,
      platform,
      latest_release_number,
      latest_release_published_at,
    } = tech;

    try {
      setIsLoading(true);

      const checkResponse = await fetch("/api/checkSubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          project_name: name,
          platform,
        }),
      });

      const checkData = await checkResponse.json();

      if (checkResponse.ok) {
        if (checkData.subscribed) {
          setIsLoading(false);
          setDialogState(true);
          setMessage({
            status: "info",
            description: `Already subscribed to ${name}`,
          });
        } else {
          const response = await fetch("/api/subscribe", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              package_id: uuidv4(),
              user_id,
              project_name: name,
              platform,
              notification: true,
              current_version: latest_release_number,
              last_date: latest_release_published_at,
            }),
          });

          const responseData = await response.json();

          if (response.ok) {
            setDialogState(true);
            setMessage({
              status: "success",
              description: `Subscribed to ${name}`,
            });
            setIsLoading(false);
          } else {
            setIsLoading(false);
            console.log("error");
            setMessage({
              status: "error",
              description: `error`,
            });
          }
        }
      } else {
        setIsLoading(false);
      }
    } catch (err:any) {
      setMessage({
        status: "error",
        description: `${err.message}`,
      });
    }
  };

  return {
    isLoading,
    handleSubscribe,
    addCommasToNumber,
  };
};
