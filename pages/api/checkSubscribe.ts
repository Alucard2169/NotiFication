import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

interface Package {
  user_id: number | null;
  project_name: string | null;
  platform: string | null;
}

interface DataProp {
  Data: Package | null;
  subscribed: boolean;
}

interface RequestData {
  user_id?: string;
  project_name?: string;
  platform?: string;
}

interface ErrorResponse {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataProp | ErrorResponse>
) {
  try {
    const { user_id, project_name, platform }: RequestData = req.body;

    // Convert the id to an integer
    const userId = user_id ? parseInt(user_id, 10) : null;

    if (userId && project_name && platform) {
      // Retrieve data from the database using Prisma
      const data = await prisma.packages.findFirst({
        where: {
          user_id: userId,
          project_name: project_name,
          platform: platform,
        },
      });

      if (data) {
        const responseData: DataProp = {
          Data: data,
          subscribed: true,
        };

        res.status(200).json(responseData);
      } else {
        res.status(200).json({ Data: null, subscribed: false });
      }
    } else {
      res.status(400).json({ error: "Missing required parameters" });
    }
  } catch (err: any) {
    console.log(err);
    return res.status(501).json({ error: err.message } as ErrorResponse);
  }
}
