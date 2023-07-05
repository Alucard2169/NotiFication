import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

interface Data {
  user_id: number | null;
  project_name: string | null;
}

interface RequestData {
  package_id: string;
  user_id: number;
  project_name: string;
  platform: string;
  notification: boolean;
  current_version: string;
  last_date: string;
}

interface ErrorResponse {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorResponse>
) {
  try {
    const requestData: RequestData = req.body;
    const {
      package_id,
      user_id,
      project_name,
      platform,
      notification,
      current_version,
      last_date,
    } = requestData;

    console.log(requestData);
    // store the package into the database
    const createdPackage = await prisma.packages.create({
      data: {
        package_id,
        user_id,
        project_name,
        platform,
        notification,
        current_version,
        last_date: last_date,
      },
    });
    console.log(createdPackage);
    if (createdPackage) {
      res.status(201).json({
        user_id: createdPackage.user_id,
        project_name: createdPackage.project_name,
      });
    }
  } catch (err: any) {
    console.log(err);
    return res.status(501).json({ error: err.message } as ErrorResponse);
  }
}
