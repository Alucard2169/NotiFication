import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const API_KEY = process.env.LIB_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = req.query.userId as string;

    const user = await prisma.users.findUnique({
      where: { id: userId },
      include: { packages: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const subscribedProjects = user.packages;

    for (const project of subscribedProjects) {
      const { platform, project_name, package_id } = project;

      // Make a request to libraries.io API to get the latest information about the project
      const url = `https://libraries.io/api/${platform}/${project_name}?api_key=${API_KEY}`;

      try {
        const response = await fetch(url);
        if (response.status === 200) {
          const projectInfo = await response.json();
          const latestVersion = projectInfo.latest_release_number;
          const latestDate = projectInfo.latest_release_published_at;

          // Compare the latest version and date with the stored version and date
          if (
            latestVersion !== project.current_version ||
            latestDate > project.last_date
          ) {
            // Update the project information in the database
            await prisma.packages.update({
              where: { package_id },
              data: {
                current_version: latestVersion,
                last_date: latestDate,
              },
            });

            // Send the notification to the user
            sendNotification(project_name, latestVersion, latestDate);
          }
        } else {
          // Handle API request errors
          console.error(
            `Error retrieving project information for ${platform}/${project_name}: ${response.status}`
          );
        }
      } catch (error) {
        // Handle API request errors
        console.error(
          `Error retrieving project information for ${platform}/${project_name}: ${error.message}`
        );
      }
    }

    return res
      .status(200)
      .json({ message: "Project updates checked successfully" });
  } catch (error) {
    console.error("Error retrieving user and project information:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

function sendNotification(
  projectName: string,
  latestVersion: string,
  latestDate: string
) {
  const message = `${projectName}: ${latestVersion} released on ${latestDate}.`;
  // Implement your notification sending logic here (e.g., email, in-app notification)
  console.log("Sending notification:", message);
}
