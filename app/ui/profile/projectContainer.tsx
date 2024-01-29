import { fetchProjects, unsubscribeProject } from "@/app/actions"; // Assuming these functions are imported from the correct path
import { TabPanel, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";
import ProjectCards from "./projectCards"; // Fix import statement


export interface DataProps {
  id: string;
  project_name: string;
  platform: string;
  create_at: string; // Fix typo
  user_id: string;
}

const ProjectContainer: React.FC = () => {
  const [data, setData] = useState<DataProps[] | null>(null);
  const [error, setError] = useState<{ head: string; message: string } | null>(
    null
  );

  const toast = useToast()


  const showToast = (head: string, message: string) => {
    toast({
      title: head,
      description: message,
      status: head === "Error" ? "error" : head === 'Attention' ? "warning" : "success",
      duration: 9000,
      isClosable: true,
    });
  };

 


const unsubscribeHandler = async (id: string) => {
  try {
    const { head, message } = await unsubscribeProject(id);

    setData((prev) => {
      if (!prev) return null; // Handle the case when prev is null
      return prev.filter((item) => item.id !== id);
    });

    showToast(head,message)
  } catch (error) {
    // Handle error if necessary
    console.error("Error unsubscribing:", error);
  }
};



  useEffect(() => {
    const fetchData = async () => {
      try {
        const { head, message, packages } = await fetchProjects();
        if (packages) {
          setData(packages);
        }
        showToast(head, message);
      } catch (error: any) {
        setError({ head: "Error", message: error.message });
        showToast("Error", error.message); // Show an error toast
      }
    };
    
    fetchData();
  }, []); 

  if (error) {
    return (
      <div>
        <p>{error.head}</p>
        <p>{error.message}</p>
      </div>
    );
  }

  if (data && data.length === 0) {
    return (
      <p className="bg-MAIN_BG p-2 rounded-md text-center text-yellow-500">
        No Project Yet
      </p>
    );
  }

  if (data && data.length > 0) {
    return (
      <TabPanel>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 overflow-scroll h-[25rem] sm:h-[30rem]">
            {data.map((packageObj) => (
              <ProjectCards
                key={packageObj.id}
                data={packageObj}
                handler={unsubscribeHandler}
              />
            ))}
        </div>
      </TabPanel>
    );
  } else {
    return (
      <div className="w-full flex justify-center mt-[10%]">
        <PacmanLoader color="white" />
      </div>
    );
  }
};

export default ProjectContainer;
