import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

interface Data {
  project_id: string;
  project_name: string;
  platform: string;
  notification: boolean;
}

interface RequestData {
  id?: number;
}

interface ErrorResponse {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[] | ErrorResponse>
) {
  try {
    const { id }: RequestData = req.query;

    // store the package into the database
    const findPackages = await prisma.packages.findMany({
      where: {
        user_id: id,
      },
    });

    res.status(200).json(findPackages);
  } catch (err: any) {
    console.log(err);
    return res.status(501).json({ error: err.message } as ErrorResponse);
  }
}
