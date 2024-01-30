"use server"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { packageDataProps } from "./ui/query/card";


// function to handle user's project fetching

export const fetchProjects = async () => {
  try {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
      cookies: () => cookieStore,
    });

    const {
      data: { session },
    } = await supabase.auth.getSession();
    const user = session?.user;

    if (!user) {
      throw new Error("User is not authenticated");
    }

    // fetch Projects

    const { data, error } = await supabase
      .from("packages")
      .select()
      .eq("user_id", user.id);

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      return {
        head: "Attention",
        message: "No Projects yet",
        packages: data,
      };
    }

    return {
      head: "Successful",
      message: "Successfully Fetched Projects",
      packages: data,
    };
  } catch (error: any) {
    return { head: "Error", message: error.message,packages:null };
  }
};



// function to handle user's project subscription

export const subscribeProject = async (packageData: packageDataProps) => {
  try {
    const { user_id, project_name, platform } = packageData;

    // get user session

    const cookieStore = cookies();
    const supabase = createServerComponentClient({
      cookies: () => cookieStore,
    });
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const user = session?.user;

    if (!user) {
      throw new Error("User is not authenticated");
    }


    // check if user is already subscribed to project.

    const { data, error } = await supabase
      .from("packages")
      .select()
      .eq("project_name", project_name)
      .eq("platform", platform)
      .eq("user_id", user_id);

    if (data && data.length > 0) {
      throw new Error("Subscription already exists");
    }

    const { data: insertData, error: insertError } = await supabase
      .from("packages")
      .insert([packageData]);

    if (insertError) {
      throw insertError;
    }

    return {
      head: "Successful",
      message: `Subscription to ${packageData.project_name} successful`,
    };
  } catch (error: any) {
    return { head: "Error", message: error.message || "An error occurred" };
  }
};


// function to handle user's project unsubscription

export const unsubscribeProject = async (id: string) => {
  try {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
      cookies: () => cookieStore,
    });
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const user = session?.user;

    if (!user) {
      throw new Error("User is not authenticated");
    }

    const { data, error: deletionError } = await supabase
      .from("packages")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (deletionError) {
      throw deletionError;
    }

    return {
      head: "Successful",
      message: `Unsubscription successful`,
    };
  } catch (error: any) {
    return { head: "Error", message: error.message || "An error occurred" };
  }
};



// fetch versions



interface Project {
  user_id: number | null;
  platform: string;
  project_name: string;
  id: string;
  current_version: string;
  last_date: string;
  create_at: string;
}

interface responseMessage {
  projectName: string;
  latestVersion: string;
  platform: string;
  daysAgo: string | null;
  hoursAgo: string | null;
}


const LIBRARIES_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const parseDateStringToDate = (dateString: string): Date => {
  return new Date(dateString);
};

export const fetchVersions = async () => {
  try {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
      cookies: () => cookieStore,
    });

    const {
      data: { session },
    } = await supabase.auth.getSession();
    const user = session?.user;

    if (!user) {
      throw new Error("User is not authenticated");
    }

    const { data, error } = await supabase
      .from("packages")
      .select()
      .eq("user_id", user.id);

    if (error) {
      throw new Error(`Error fetching packages: ${error.message}`);
    }

    const packages = data.length === 0 ? null : data;

    if (!packages) {
      return;
    }

    const subscribedProjects: Project[] = packages as Project[];
    const updateMessages: responseMessage[] = [];

    for (const project of subscribedProjects) {
      const { platform, project_name, id, create_at } = project;
      const url = `https://libraries.io/api/${platform}/${project_name}?api_key=${LIBRARIES_API_KEY}`;

      try {
        const response = await fetch(url);

        if (response.status === 200) {
          const projectInfo = await response.json();
          const latestVersion = projectInfo.latest_release_number;
          const latestDate = parseDateStringToDate(
            projectInfo.latest_release_published_at
          );
          const createdDate = parseDateStringToDate(create_at);

          if (latestDate > createdDate) {
            await supabase
              .from("packages")
              .update({
                current_version: latestVersion,
                last_date: latestDate.toISOString(), // Ensure it's in the correct format
              })
              .eq("package_id", id);

            const updateMessage = createNotification(
              project_name,
              latestVersion,
              latestDate,
              platform
            );
            updateMessages.unshift(updateMessage);
          }
        } else {
          console.error(
            `Error retrieving project information for ${platform}/${project_name}: ${response.status}`
          );
        }
      } catch (error : any) {
        console.error(
          `Error processing project ${platform}/${project_name}: ${error.message}`
        );
      }
    }

    return { messages: updateMessages, status: "ok" };
  } catch (error) {
    console.error("Error retrieving user and project information:", error);
    throw error;
  }
};

function createNotification(
  projectName: string,
  latestVersion: string,
  latestDate: Date,
  platform: string
): responseMessage {
  const currentDate = new Date();
  const timeDifferenceInMillis = currentDate.getTime() - latestDate.getTime();
  const days = Math.floor(timeDifferenceInMillis / (1000 * 60 * 60 * 24)); 
  let daysAgo = Math.floor(timeDifferenceInMillis / (1000 * 60 * 60 * 24)) + " Days ago";

  if (days < 1) {
    // Calculate hours instead
    const hoursAgo = Math.floor(timeDifferenceInMillis / (1000 * 60 * 60)) + " Hours ago";
    return {
      projectName,
      latestVersion,
      platform,
      hoursAgo,
      daysAgo: null,
    };
  }

  return {
    projectName,
    latestVersion,
    platform,
    daysAgo,
    hoursAgo: null,
  };
}
