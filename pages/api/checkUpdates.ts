import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const API_KEY = process.env.LIB_API_KEY;

interface Project {
  user_id: number | null;
  platform: string;
  project_name: string;
  package_id: string;
  current_version: string;
  last_date: string;
}

interface responseMessage {
  project_name: string;
  latest_version: string;
  time: number;
}

interface RequestData {
  id?: string;
}

const convertDate = (date: string): Date => {
  const dateObject = new Date(date);
  return dateObject;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id }: RequestData = req.query;

    // Convert the id to an integer
    const userId = id ? parseInt(id, 10) : undefined;

    const user = await prisma.users.findUnique({
      where: { user_id: userId },
      include: { packages: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const subscribedProjects: Project[] = user.packages as Project[];

    const updateMessages: responseMessage[] = []; // Store update messages for each project

    for (const project of subscribedProjects) {
      const { platform, project_name, package_id } = project;

      const url = `https://libraries.io/api/${platform}/${project_name}?api_key=${API_KEY}`;

      try {
        const response = await fetch(url);
        if (response.status === 200) {
          const projectInfo = await response.json();
          const latestVersion = projectInfo.latest_release_number;
          const latestDate = projectInfo.latest_release_published_at;
          const newDate = convertDate(projectInfo.latest_release_published_at);

          const lastDate = convertDate(project.last_date);

          // Calculate the difference in months between the new and last dates
          const monthDifference =
            (newDate.getFullYear() - lastDate.getFullYear()) * 12 +
            (newDate.getMonth() - lastDate.getMonth());

          if (
            latestVersion !== project.current_version ||
            monthDifference <= 1
          ) {
            await prisma.packages.update({
              where: { package_id },
              data: {
                current_version: latestVersion,
                last_date: latestDate,
              },
            });

            const updateMessage = sendNotification(
              project_name,
              latestVersion,
              newDate
            );
            updateMessages.unshift(updateMessage);
          }
        } else {
          console.error(
            `Error retrieving project information for ${platform}/${project_name}: ${response.status}`
          );
        }
      } catch (error: any) {
        console.error(
          `Error retrieving project information for ${platform}/${project_name}: ${error.message}`
        );
      }
    }

    return res.status(200).json({ messages: updateMessages, status: "ok" });
  } catch (error) {
    console.error("Error retrieving user and project information:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

function sendNotification(
  projectName: string,
  latestVersion: string,
  latestDate: Date
) {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - latestDate.getTime();
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Calculate the difference in days

  const message: responseMessage = {
    project_name: projectName,
    latest_version: latestVersion,
    time: daysAgo,
  };
  return message;
}
