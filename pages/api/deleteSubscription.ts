import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

interface DataProp {
  message: string;
}

interface RequestData {
  user_id?: string;
  package_id?: string;
}

interface ErrorResponse {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataProp | ErrorResponse>
) {
  try {
    const { user_id, package_id }: RequestData = req.body;

    // Convert the id to an integer
    const userId = user_id ? parseInt(user_id, 10) : null;

    if (userId && package_id) {
      // Check if the project exists in the database
      const existingProject = await prisma.packages.findFirst({
        where: {
          user_id: userId,
          package_id: package_id,
        },
      });

      if (existingProject) {
        // Delete the existing project
        await prisma.packages.delete({
          where: {
            package_id: package_id,
          },
        });

        res.status(200).json({ message: "successful" });
      } else {
        res.status(200).json({ message: "unsuccessful" });
      }
    } else {
      res.status(400).json({ error: "Missing required parameters" });
    }
  } catch (err: any) {
    console.log(err);
    return res.status(501).json({ error: err.message } as ErrorResponse);
  }
}
